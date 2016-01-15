/* Javascript Document
Fernando Torres
Version:1.0
*/

	function enviarFormulario() {

		//Obttiene el formulario.
		var formulario = $('#formulario');

		//Obtiene el DIV para la respuesta.
		var respuesta = $('#respuesta');

		//Establese un eventListener para el formulario.
		$(formulario).submit(function(e){

			//Detiene el envío del formulario.
			e.preventDefault();

			//Obtiene los datos serializados ("nombre=valor&nombre=valor")
			var informacion = $(formulario).serialize();

			//Envía el formulario usando AJAX
			$.ajax({
				type: 'POST',
				url: $(formulario).attr('action'),
				data: informacion
			})
			.done(function(response) {

				//Si se envió correctamente...
				//Configura el estilo del DIV de respuesta, escribe el mensaje y lo muestra.
				$(respuesta).css("color", "#080");
				$(respuesta).css("background", "#cfc url(img/tick.svg) no-repeat");
				$(respuesta).css("background-position", "right 15px center");
				$(respuesta).css("background-size", "20px");
				$(respuesta).text(response);
				$(respuesta).slideDown('slow');

				//Formatea los campos.
				$('#nombre').val('');
				$('#correo').val('');
				$('#mensaje').val('');

			})
			.fail(function(data) {

				//Si no se envió.
				//Configura el estilo del DIV y muestra el mensaje de error.
				$(respuesta).css("color", "#900");
				$(respuesta).css("background", "#fdd");
				$(respuesta).slideDown('slow');

				//Establece el mensaje de error.
				if (data.responseText !== '') {
					$(respuesta).text(data.responseText);
				} else {
					$(respuesta).text('Ha ocurrido un error y el mensaje no pudo ser enviado.');
				}

			});

		});

	}
