var Total;
var Usuario;
jQuery(function () {
    Total = 0;
    $("#txtTotalCompra").val(FormatoMiles(Total));
    $("#txtFechaCompra").val(FechaHoy());
    $("#txtNumeroFactura").val(Total);
    Usuario = getCookie("Usuario");
    $("#txtUsuario").val(Usuario);
    ConsultarEmpleado();
    LlenarTipoProducto();
});
function GrabarFactura() {
    Total = 0;
    $("#txtTotalCompra").val(FormatoMiles(Total));
    $("#txtNumeroFactura").val(0);
    $("#txtDocumento").val("");
    $("#txtNombreCliente").val("");
    let tabla = new DataTable('#tblFactura');
    tabla.clear().draw();
}
async function MostrarDetalleFactura(NumeroFactura) {
    LlenarTablaXServiciosAuth("https://localhost:44323/api/Facturas/MostrarDetalleFactura?NumeroFactura=" + NumeroFactura, "#tblFactura");
}
function CalcularTotal(Cantidad, ValorUnitario, Operacion) {
    let Subtotal = Operacion == "Suma" ? (Cantidad * ValorUnitario) : (Cantidad * ValorUnitario * -1);
    Total += Subtotal;
    $("#txtTotalCompra").val(FormatoMiles(Total));
}
async function LlenarTipoProducto() {
    await LlenarComboXServiciosAuth("https://localhost:44323/api/TipoProductos/ListarTodos", "#cboTipoProducto");
    let TipoProducto = $("#cboTipoProducto").val();
    LlenarProductos(TipoProducto);
}
async function LlenarProductos(TipoProducto) {
    if (TipoProducto == 0) {
        TipoProducto = $("#cboTipoProducto").val();
    }
    await LlenarComboXServiciosAuth("https://localhost:44323/api/Productos/ListarProductosXTipo?TipoProducto=" + TipoProducto, "#cboProducto");
    let codProducto = $("#cboProducto").val();
    ConsultarValorUnitario(codProducto);
}
function ConsultarValorUnitario(CodProducto) {
    let arrValorUnitario = CodProducto == 0 ? $("#cboProducto").val() : CodProducto;
    ValorUnitario = arrValorUnitario.split('|')[1];
    $("#txtCodigoProducto").val(arrValorUnitario.split('|')[0]);
    $("#txtValorUnitario").val(ValorUnitario);
    $("#txtValorUnitarioTexto").val(FormatoMiles(ValorUnitario));
    let Cantidad = $("#txtCantidad").val();
    if (Cantidad < 1) {
        Cantidad = 1;
        $("#txtCantidad").val(1);
    }
    $("#txtSubtotal").val(FormatoMiles(Cantidad * ValorUnitario));
}
async function ConsultarEmpleado() {
    const Empleado = await ConsultarServicioAuth("https://localhost:44323/api/Empleados/ConsultarXUsuario?Usuario=" + Usuario);
    if (Empleado == null) {
        alert("Error");
    }
    else {
        $("#txtidEmpleado").val(Empleado[0].idEmpleadoCargo);
        $("#idTitulo").html("FACTURA DE COMPRA - Empleado: " + Empleado[0].Empleado + " - Cargo: " + Empleado[0].Cargo);
    }
}
async function Consultar() {
    let Documento = $("#txtDocumento").val();
    const Cliente = await ConsultarServicioAuth("https://localhost:44323/api/Clientes/ConsultarXDocumento?Documento=" + Documento);
    if (Cliente == null) {
        alert("Error");
    }
    else {
        $("#txtNombreCliente").val(Cliente.Nombre + ' ' + Cliente.PrimerApellido + ' ' + Cliente.SegundoApellido);
    }
}
async function Eliminar(Codigo, Cantidad, ValorUnitario) {
    const detalleFacturas = [new DEtalleFActuras(Codigo, $("#txtNumeroFactura").val(), $("#txtCodigoProducto").val(), $("#txtCantidad").val(), $("#txtValorUnitario").val())];
    const factura = new Factura($("#txtNumeroFactura").val(), $("#txtDocumento").val(), $("#txtFechaCompra").val(), $("#txtidEmpleado").val(), detalleFacturas);
    let NumeroFactura = await EjecutarServicioRptaAuth("DELETE", "https://localhost:44323/api/Facturas/Eliminar", factura);
    $("#txtNumeroFactura").val(NumeroFactura);
    CalcularTotal($("#txtCantidad").val(), $("#txtValorUnitario").val(), "Resta");
    MostrarDetalleFactura(NumeroFactura);
}
async function GrabarProducto() {
    const detalleFacturas = [new DEtalleFActuras(0, $("#txtNumeroFactura").val(), $("#txtCodigoProducto").val(), $("#txtCantidad").val(), $("#txtValorUnitario").val())];
    const factura = new Factura($("#txtNumeroFactura").val(), $("#txtDocumento").val(), $("#txtFechaCompra").val(), $("#txtidEmpleado").val(), detalleFacturas);
    let NumeroFactura = await EjecutarServicioRptaAuth("POST", "https://localhost:44323/api/Facturas/GrabarFactura", factura);
    $("#txtNumeroFactura").val(NumeroFactura);
    CalcularTotal($("#txtCantidad").val(), $("#txtValorUnitario").val(), "Suma");
    MostrarDetalleFactura(NumeroFactura);
    $("#btnGrabarFactura").prop("disabled", false);
}
class Factura {
    constructor(Numero, Documento, Fecha, CodigoEmpleado, detalles) {
        this.Numero = Numero;
        this.Documento = Documento;
        this.Fecha = Fecha;
        this.CodigoEmpleado = CodigoEmpleado;
        this.DEtalleFActuras = detalles;
    }
}
class DEtalleFActuras {
    constructor(Codigo, Numero, CodigoProducto, Cantidad, ValorUnitario) {
        this.Codigo = Codigo;
        this.Numero = Numero;
        this.CodigoProducto = CodigoProducto;
        this.Cantidad = Cantidad;
        this.ValorUnitario = ValorUnitario;
    }
}