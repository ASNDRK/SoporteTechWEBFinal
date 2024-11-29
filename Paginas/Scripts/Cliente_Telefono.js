jQuery(function () {
    //Se ejecuta al cargar la página
    LlenarComboXServiciosAuth("https://localhost:44323/api/TipoTelefonos/LlenarCombo", "#cboTipoTelefono");
    //Invoca el llenado de la tabla
    LlenarTablaClientes();
});
function EditarTelefono(Codigo, idTipoTelefono, NumeroTelefono) {
    $("#txtCodigo").val(Codigo);
    $("#cboTipoTelefono").val(idTipoTelefono);
    $("#txtNumero").val(NumeroTelefono);
}
function Editar(Documento, Nombre, PrimerApellido, SeguntodApellido, Direccion, Email, FechaNacimiento) {
    $("#txtDocumento").val(Documento);
    $("#txtNombre").val(Nombre);
    $("#txtPrimerApellido").val(PrimerApellido);
    $("#txtSegundoApellido").val(SeguntodApellido);
    $("#txtDireccion").val(Direccion);
    $("#txtEmail").val(Email);
    $("#txtFechaNacimiento").val(FechaNacimiento);
}
function LlenarTablaClientes() {
    LlenarTablaXServiciosAuth("https://localhost:44323/api/Clientes/ListadoClientesConTelefono", "#tblClientes");
}
function LlenarTablaTelefonos() {
    //Limpia la tabla primero
    let tabla = new DataTable('#tblTelefonos');
    tabla.clear().draw();
    let Documento = $("#txtDocumento").val();
    let Cliente = $("#txtNombre").val() + " " + $("#txtPrimerApellido").val() + " " + $("#txtSegundoApellido").val();
    $("#modTelefonosLabel").html("GESTIÓN DE TELÉFONOS DEL CLIENTE: " + Cliente);
    LlenarTablaXServiciosAuth("https://localhost:44323/api/Telefonos/ListadoTelefonosXCliente?Documento=" + Documento, "#tblTelefonos");
}
async function EjecutarComando(Metodo, Funcion) {
    event.preventDefault();
    let URL = "https://localhost:44323/api/Telefonos/" + Funcion;
    const telefono = new Telefono($("#txtCodigo").val(), $("#txtNumero").val(), $("#txtDocumento").val(), $("#cboTipoTelefono").val());
    await EjecutarServicioAuth(Metodo, URL, telefono);
    LlenarTablaTelefonos();
}
class Telefono {
    constructor(Codigo, Numero, Documento, CodigoTipoTelefono) {
        this.Codigo = Codigo;
        this.Numero = Numero;
        this.Documento = Documento;
        this.CodigoTipoTelefono = CodigoTipoTelefono;
    }
}