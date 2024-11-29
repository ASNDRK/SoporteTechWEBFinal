class Usuario {
    constructor(UsuarioID, Nombre, Correo, ContraseñaHash, Salt, FechaCreacion, Condicion) {
        this.UsuarioID = UsuarioID;
        this.Nombre = Nombre;
        this.Correo = Correo;
        this.ContraseñaHash = ContraseñaHash;
        this.Salt = Salt;
        this.FechaCreacion = FechaCreacion;
        this.Condicion = Condicion;
        
    }
}

class Cliente {

    constructor(Nombre, Telefono, Direccion, Cedula) {
        this.Nombre = Nombre;
        this.Telefono = Telefono;
        this.Direccion = Direccion;
        this.Cedula = Cedula;
    }

}

var total;
jQuery(function () {
    //Se ejecuta al cargar la página
    total = 0;
    $("#txtFechaCreacion").val(FormatoMiles(total));
    $("#txtFechaCreacion").val(FechaHoy(total));

    LlenarComboXServicios("http://localhost:52484/api/Roles/ListarRoles", "#cboRol");
    LlenarTabla();
});

function LlenarTabla() {
    LlenarTablaXServicios("http://localhost:52484/api/Usuarios/ListarUsuarios", "#tblUsuarios");


}



async function EjecutarComando(Metodo, Funcion) {
    let idRol = $("#cboRol").val();
    let Clave = $("#txtContrasena").val();
    //let Estado = $("#cboEstado").val();
    let RepitaClave = $("#txtConfirmarContrasena").val();
    if (Clave != RepitaClave) {
        $("#dvMensaje").html("Las claves no son iguales");
        return;
    }
    let URL = "http://localhost:52484/api/Usuarios/" + Funcion + "?Rol=" + idRol;
    const usuario = new Usuario(
        $("#txtUsuarioID").val(),
        $("#txtNombre").val(),
        $("#txtCorreo").val(),
        Clave,
        $("#txtSalt").val(),
        $("#txtFechaCreacion").val(),
        "Activo");

    // Asignando un estado predeterminado
    await EjecutarServicio(Metodo, URL, usuario);
    LlenarTabla();
}

async function EjecutarComandoCliente(Metodo, Funcion) {
    let URL = "http://localhost:52484/api/Usuarios/" + Funcion;
    const cliente = new Cliente(
        $("#txtNombreCliente").val(),
        $("#txtTelefono").val(),
        $("#txtDireccion").val(),
        $("#txtCedula").val(),


    // Asignando un estado predeterminado
    await EjecutarServicio(Metodo, URL, usuario);
    LlenarTabla();
}



