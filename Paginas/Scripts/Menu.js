jQuery(function () {
    //Registrar los botones para responder al evento click
    $("#dvMenu").load("../Paginas/Menu.html")
});
function SalidaSegura() {
    document.cookie = "token=..;path=/";
    document.cookie = "Perfil=..;path=/";
}