/* Javascript Document
Fernando Torres
Version:1.0
*/
/*
  Debe haber un form#formulario y un div#respuesta.
  Necesita jQuery.
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

			//Envía el formulario con el metodo POST usando AJAX
			$.ajax({
				type: 'POST',
				url: $(formulario).attr('action'),
				data: informacion
			})
			.done(function(response) {

				//Si se envió correctamente...
				//Establece el estilo del DIV de respuesta, escribe el mensaje y lo muestra.
				$(respuesta).attr('class', 'exito');
				$(respuesta).text(response);
				$(respuesta).slideDown('slow');

				//Formatea los campos del form.
				$('#nombre').val('');
				$('#correo').val('');
				$('#mensaje').val('');

			})
			.fail(function(data) {

				//Si no se envió.
				//Establece el estilo del DIV y muestra el mensaje de error.
				$(respuesta).attr("class", "error");
				$(respuesta).slideDown('slow');

				//Establece el mensaje de error.
				if (data.responseText !== '') {
					$(respuesta).text(data.responseText);
				} else {
					$(respuesta).text('Ha ocurrido un error, el mensaje no fue enviado.');
				}

			});

		});
	}
