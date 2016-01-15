/* Javascript Document
Fernando Torres
Version:1.0
*/

	function enviarFormulario() {

		//Obttiene el formulario.
		var formulario = document.querySelectorAll('.ajax');

		//Establese un eventListener para cada formulario.
		for (var i = 0; i < formulario.length; i++) {
			
			formulario[i].bandera = true;
			formulario[i].onsubmit = function(e) {

				//Detiene el envío del formulario.
				e.preventDefault();
				
				enviar(this);
			}
		}


		function enviar(esteForm){
			
			//Obtiene el DIV para la respuesta.
			var respuesta = esteForm.querySelector('.respuesta');
			
			if (esteForm.bandera)
			{
				esteForm.titulo = respuesta.innerHTML;
				esteForm.bandera = false;
			}

			//Obtiene los datos serializados ("nombre=valor&nombre=valor")
			var informacion = $(esteForm).serialize();

			//Envía el formulario usando AJAX
			$.ajax({
				type: 'POST',
				url: $(esteForm).attr('action'),
				data: informacion
			})
			.done(function(response) {

				//Si se envió correctamente...
				//Configura el estilo del DIV de respuesta, escribe el mensaje y lo muestra.
				$(respuesta).html(response);

				//Formatea los campos.
				$('.campo-ajax').val('');

				setTimeout(function(){
					$(respuesta).text(esteForm.titulo);
				}, 3000);
		
			})
			.fail(function(data) {

				//Establece el mensaje de error.
				if (data.responseText !== '') {
					$(respuesta).text(data.responseText);
				} else {
					$(respuesta).text('Ha ocurrido un error.');
				}

				setTimeout(function(){
					$(respuesta).text(esteForm.titulo);
				}, 5000);
		
			});

		}

	}
