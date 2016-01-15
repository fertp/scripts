//Debe haber un <canvas> de 56x50 con class .boton

	function dibujarBarritas(){

		var boton = document.querySelector('#boton');
		c = boton.getContext('2d');

		var desplegado = false,
			barras = [],
			trans = -10,
			anchoPantalla = 768;

		function barrita(trans){
			
			this.x = -18;
			this.y = -2;
			this.trans = trans;
			this.posY = this.y + trans;
			this.ancho = 36;
			this.alto = 4;

			this.vy = 1;
			this.anguloInicial = 0;
			this.anguloFinal = 45;
			this.velGiro = -5;
			this.opacidad = 1;
			this.velOpacidad = 0.1;
			this.color = "rgba(0,0,0," + this.opacidad + ")";
		}

		barrita.prototype.dibujar = function(){

			c.fillStyle = this.color;

			//Angulo barras 1 y 3
			this.anguloInicial += this.velGiro;			

			if (this.anguloInicial >= this.anguloFinal)
				this.anguloInicial = this.anguloFinal;
				else if (this.anguloInicial <= 0)
					this.anguloInicial = 0;

			//Opacidad barra2
			if (this.trans == 0){
				c.fillStyle = "rgba(0,0,0," + this.opacidad + ")";
				this.opacidad += this.velOpacidad;
				if (this.opacidad < 0)
					this.opacidad = 0;
					else if (this.opacidad > 1)
						this.opacidad = 1;
			}
				
			//Posición barras 1 y 2
			if (desplegado) {

				if (this.posY > this.y)
						this.posY -= this.vy;
					else if (this.posY < this.y)
						this.posY += this.vy;
			}
			else {
				
				if (this.posY > this.y + this.trans)
					this.posY -= this.vy;
					else if (this.posY < this.y + this.trans)
						this.posY += this.vy;
				
			}

			c.fillRect(this.x,this.posY, this.ancho,this.alto);
		}

		for (var i = 0; i < 3; i++){

			barras[i] = new barrita(trans);
			trans += 10;
		}
			
		$("#boton, #menu").click(function () {

			if (window.innerWidth <= anchoPantalla) {

				for (var i = 0; i < 3; i++){
					barras[i].velGiro *= -1;
					barras[i].velOpacidad *= -1;
				}

				if (desplegado) 
					desplegado = false;
				else
					desplegado = true;
			}
		});
						
		setInterval( function() {
			
			c.setTransform(1, 0, 0, 1, 0, 0);
			c.clearRect(0,0, boton.width,boton.height);
			
			c.translate(boton.width/2, boton.height/2);
			c.rotate(barras[0].anguloInicial*Math.PI/180);
			barras[0].dibujar();

			c.setTransform(1, 0, 0, 1, 0, 0);
			c.translate(boton.width/2, boton.height/2);
			barras[1].dibujar();

			c.rotate(-barras[2].anguloInicial*Math.PI/180);
			barras[2].dibujar();

		}, 1000/30);

	}//dibujarBarritas()


	window.onload = function(){


	 	dibujarBarritas();
	}
