jQuery(function () {
    //Registrar los botones para responder al evento click
    $("#dvMenu").load("../Paginas/Menu.html")
});
async function Consultar() {
    //alert("Click en el botón consultar");
    //console.log("Click en el botón consultar");
    /*
        let: Variable de ambito local, que solo aplica a la función
        var: Variable de ambito global, que aplica para la página que se está trabajando
        const: Constante. Se utiliza para la definición de objetos
    */
    let Documento = $("#txtDocumento").val();
    //Para invocar el servicio, vamos a utilizar el método fetch de javascript, que permite un servicio en una url con unos parámetros definidos
    try {
        const Resultado = await fetch("https://localhost:44323/apli/Clientes/ConsultarXDocumento?Documento=" + Documento,
            {
                method: "GET",
                mode: "cors",
                headers: { "Content-Type": "application/json"}
            });
        //Se transforma el Resultado a un formato Json para procesarlo en el html
        const Respuesta = await Resultado.json();
        $("#txtNombre").val(Respuesta.Nombre);
        $("#txtPrimerApellido").val(Respuesta.PrimerApellido);
        $("#txtSegundoApellido").val(Respuesta.SegundoApellido);
        $("#txtEmail").val(Respuesta.Email);
        $("#txtDireccion").val(Respuesta.Direccion);
        $("#txtFechaNacimiento").val(Respuesta.FechaNacimiento.split('T')[0]);
    }
    catch (error) {
        $("#dvMensaje").html(error);
    }
}
function Insertar() {
    EjecutarComando("POST", "Insertar");
}
function Actualizar() {
    EjecutarComando("PUT", "Actualizar");
}
function Eliminar() {
    EjecutarComando("DELETE", "Eliminar");
}

async function EjecutarComando(Metodo, Funcion) {
    const cliente = new Cliente($("#txtDocumento").val(), $("#txtNombre").val(), $("#txtPrimerApellido").val(), $("#txtSegundoApellido").val(),
        $("#txtEmail").val(), $("#txtDireccion").val(), $("#txtFechaNacimiento").val());

    try {
        const Resultado = await fetch("https://localhost:44323/apli/Clientes/" + Funcion,
            {
                method: Metodo,
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cliente)
            });
        const Respuesta = await Resultado.json();
        $("#dvMensaje").html(Respuesta);
    }
    catch (error) {
        $("#dvMensaje").html(error);
    }
}
//Clases en javascript
class Cliente {
    constructor(Documento, Nombre, PrimerApellido, SegundoApellido, Email, Direccion, FechaNacimiento) {
        this.Documento = Documento;
        this.Nombre = Nombre;
        this.PrimerApellido = PrimerApellido;
        this.SegundoApellido = SegundoApellido;
        this.Email = Email;
        this.Direccion = Direccion;
        this.FechaNacimiento = FechaNacimiento;
    }
}