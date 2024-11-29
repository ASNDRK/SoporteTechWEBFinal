jQuery(function () {
    //Se ejecuta al cargar la página
    LlenarComboXServiciosAuth("https://localhost:44323/api/TipoProductos/ListarTodos", "#cboTipoProducto");

    LlenarTabla();
});
function LlenarTabla() {
    LlenarTablaXServiciosAuth("https://localhost:44323/api/Productos/ListarProductosConTipo", "#tblProductos");
}
class Producto {
    constructor(Codigo, Nombre, Descripcion, Cantidad, ValorUnitario, CodigoTipoProducto) {
        this.Codigo = Codigo;
        this.Nombre = Nombre;
        this.Descripcion = Descripcion;
        this.Cantidad = Cantidad;
        this.ValorUnitario = ValorUnitario;
        this.CodigoTipoProducto = CodigoTipoProducto;
    }
}
async function EjecutarComando(Metodo, Funcion) {
    let URL = "https://localhost:44323/api/Productos/" + Funcion;
    const producto = new Producto($("#txtCodigo").val(), $("#txtNombre").val(), $("#txtDescripcion").val(),
        $("#txtCantidad").val(), $("#txtValorUnitario").val(), $("#cboTipoProducto").val());
    await EjecutarServicioAuth(Metodo, URL, producto);
    LlenarTabla();
}
async function Consultar() {
    let Codigo = $("#txtCodigo").val();
    let URL = "https://localhost:44323/api/Productos/Consultar?Codigo=" + Codigo;
    const producto = await ConsultarServicioAuth(URL);
    if (producto == null) {
        $("#dvMensaje").html("El código del producto no existe en la base de datos");
        $("#txtNombre").val("");
        $("#txtDescripcion").val("");
        $("#txtCantidad").val("");
        $("#txtValorUnitario").val("");
        $("#cboTipoProducto").val("");
    }
    else {
        //Escribir las respuestas
        $("#txtNombre").val(producto.Nombre);
        $("#txtDescripcion").val(producto.Descripcion);
        $("#txtCantidad").val(producto.Cantidad);
        $("#txtValorUnitario").val(producto.ValorUnitario);
        $("#cboTipoProducto").val(producto.CodigoTipoProducto);
        $("#dvMensaje").html("");
    }
}