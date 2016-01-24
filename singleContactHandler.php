<?php

    // Solo procesara peticiones POST.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Tomar los campos del formulario y borrar los espacios..
        $nombre = strip_tags(trim($_POST["nombre"]));
				$nombre = str_replace(array("\r","\n"),array(" "," "),$nombre);
        $correo = filter_var(trim($_POST["correo"]), FILTER_SANITIZE_EMAIL);
        $mensaje = trim($_POST["mensaje"]);

        // Verificar que los campos no esten vacios.
        if ( empty($nombre) OR empty($mensaje) OR !filter_var($correo, FILTER_VALIDATE_EMAIL)) {
            // Establecer un codigo de respuesta 400 (bad request) y salir.
            http_response_code(400);
            echo "Por favor, completa correctamente el formulario e intenta de nuevo.";
            exit;
        }

        // Configurar la direccion de quien recibe.
        $miCorreo = "tp.fernando@gmail.com";

        // Configurar el asunto.
        $asunto = "Nuevo mensaje de $nombre";

        // Construir el contenido.
        $contenido = "Nombre: $nombre\n";
        $contenido .= "Correo: $correo\n\n";
        $contenido .= "Mensaje:\n$mensaje\n";

        // Construir los headers.
        $headers = "From: $nombre <$correo>";

        // Enviar el correo.
        if (mail($miCorreo, $asunto, $contenido, $headers)) {
            // Establecer un código de respuesta 200 (okay).
            http_response_code(200);
            echo "El mensaje ha sido enviado correctamente.";
        } else {
            // Establecer un código de respuesta 500 (internal server error).
            http_response_code(500);
            echo "Ocurrió un error, el mensaje no pudo ser enviado.";
        }

    } else {
        // Si no es una petición POST, establece un código de respuesta 403 (forbidden).
        http_response_code(403);
        echo "Ocurrió un error con los datos, por favor intente de nuevo.";
    }

?>
