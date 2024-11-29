class Cargo {
    constructor(Codigo, Nombre, Salario) {
        this.Codigo = Codigo;
        this.Nombre = Nombre;
        this.Salario = Salario
    }
}
async function EjecutarComando(Metodo, Funcion) {
    let URL = "https://localhost:44323/api/Cargos/" + Funcion;
    const cargo = new Cargo($("#txtCodigo").val(), $("#txtNombre").val(), $("#txtSalario").val());
    EjecutarServicio(Metodo, URL, cargo);
}
async function Consultar() {
    let Codigo = $("#txtCodigo").val();
    let URL = "https://localhost:44323/api/Cargos/ConsultarXCodigo?Codigo=" + Codigo;
    const cargo = await ConsultarServicio(URL);
    if (cargo == null) {
        $("#dvMensaje").html("El código del cargo no existe en la base de datos");
        $("#txtNombre").val("");
        $("#txtSalario").val("");
    }
    else {
        //Escribir las respuestas
        $("#txtNombre").val(cargo.Nombre);
        $("#txtSalario").val(cargo.Salario);
        $("#dvMensaje").html("");
    }
}