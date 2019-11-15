var canvas=document.getElementById("Pong");
var ctx=canvas.getContext("2d");

var barraAnc= 7;
var barraAlt=75;



var pausa=false;
var distOffset = 0;
var x=canvas.width/2;
var y= (canvas.height/2)+distOffset;
var x2=canvas.width/2;
var y2= (canvas.height/2)-distOffset;
var dx=-3;
var dy=-3;
var dx2=-3;
var dy2=-3;
var aceleracion = 0.01;
var validation = true;
var radio = 8;
var rand;
var ballColor = "red";
var autoMove = false;


var barra1Y = (canvas.height-barraAlt)/2;
var barra2Y = (canvas.height-barraAlt)/2;

var arriba1= false;
var abajo1= false;
var arriba2= false;
var abajo2= false;

var vidas1=3;
var vidas2=3;
var puntos1=0;
var puntos2=0;
var puntosMax = 10;
var audio1 = 0;
function vidas(){
	

	if (puntos1 == puntosMax) {
		alert("HA GANADO EL JUGADOR 1");
		if(confirm("DESEA JUGAR NUEVAMENTE?")){
			puntos2 = 0;
			puntos1 = 0;
			document.location.reload();
		}
	} else if(puntos2 == puntosMax) {
		alert("HA GANADO EL JUGADOR 2");
		if(confirm("DESEA JUGAR NUEVAMENTE?")){
			puntos2 = 0;
			puntos1 = 0;
			document.location.reload();
		}
	}
}

document.addEventListener("keydown", teclaPresionada1, false);
document.addEventListener("keyup", teclaSinPresionar1, false);
document.addEventListener("keydown", teclaPresionada2, false);
document.addEventListener("keyup", teclaSinPresionar2, false);
document.addEventListener("keyup", autoMoveOnOff, false);


function autoMoveOnOff(event){
	if(event.keyCode == 77){
		if(autoMove == true){
			autoMove = false;
		} else {
			autoMove = true;
		}
	}
	if(event.keyCode==80 && pausa==false){
		pausa=true;
	}else if(event.keyCode==80 && pausa==true){
		pausa=false;
	}
	if(event.keyCode==84 && audio1==0){
		var audio = document.getElementById("audio1");
		audio.pause();
		audio = document.getElementById("audio2");
		audio.play();
		audio1 = 1;
	}else if(event.keyCode==84 && audio1==1){
		var audio = document.getElementById("audio2");
		audio.pause();
		audio = document.getElementById("audio3");
		audio.play();
		audio1 = 2;
	} else if(event.keyCode==84 && audio1 == 2){
		var audio = document.getElementById("audio3");
		audio.pause();
		audio = document.getElementById("audio1");
		audio.play();
		audio1 = 0;
	}
}


function teclaPresionada1(event){
	if(event.keyCode ==83){
		arriba1 = true;
	}else if(event.keyCode == 87){
		abajo1 = true;
	}
	
}
function teclaPresionada2(event){

	if(event.keyCode ==40){
		arriba2 = true;
	}else if(event.keyCode == 38){
		abajo2 = true;
	}
}

function teclaSinPresionar1(event){
	if(event.keyCode == 83){
		arriba1 = false;
	}else if(event.keyCode == 87){
		abajo1 = false;
	}
	
}
function teclaSinPresionar2(event){

	if(event.keyCode ==40){
		arriba2 = false;
	}else if(event.keyCode == 38){
		abajo2 = false;
	}
}

function rebote(){
	if(pausa == false){
		if(y+dy > canvas.height-radio || y + dy < radio ){
	 		dy = -dy;
		}
		if(x + dx < radio) {
	        if(y > barra1Y && y < barra1Y + barraAlt) {
	            dx = -dx;
	        } 
	        else {
	        	
	    		x=canvas.width/2;
				y= (canvas.height/2)+distOffset;

				rand = Math.random();
				if(rand<0.25){
					dx=-3;
					dy=-3;	
				}else if(rand < 0.5){
					dx=3;
					dy=-3;
				}else if(rand<0.75){
					dx=3;
					dy=3;
				}else{
					dx=-3;
					dy=3;
				}
				puntos2+=1;
				//barra1Y =  (canvas.height-barraAlt)/2;
				//barra2Y =  (canvas.height-barraAlt)/2;
	    		
	        }
	    }else if(x + dx > canvas.width-radio){
	    	if(y > barra2Y && y < barra2Y + barraAlt) {
	            dx = -dx;
	        } else {

	        	x=canvas.width/2;
				y= (canvas.height/2)+distOffset;
				rand = Math.random();

				if(rand<0.25){
					dx=-3;
					dy=-3;	
				}else if(rand < 0.5){
					dx=3;
					dy=-3;
				}else if(rand<0.75){
					dx=3;
					dy=3;
				}else{
					dx=-3;
					dy=3;
				}
				puntos1+=1;
			
				//barra1Y =  (canvas.height-barraAlt)/2;
				//barra2Y =  (canvas.height-barraAlt)/2;
	        }
	    }
	    
	    x += dx;
		y += dy;

		//dx += aceleracion; //GRAVEDAD :)
		//dy += aceleracion;


		if(autoMove == true){
			barra1Y = y -barraAlt/2;
			barra2Y = y -barraAlt/2;
		}
		rand = Math.random();

		

		dx = dx +(dx/Math.abs(dx))*aceleracion ;
		dy = dy + (dy/Math.abs(dy))*aceleracion ;
		if(x > 2*canvas.width/5 && x < 3*canvas.width/5){
			if(rand > 0.99){
				dx = -dx;
			}else if(rand <0.99 && rand>0.98 ){
					dy = -dy;
			}
		}
	}
}
function rebote2(){

	if(y2+dy2 > canvas.height-radio || y2 + dy2 < radio ){
 		dy2 = -dy2;
	}
	if(x2 + dx2 < radio) {
        if(y2 > barra1Y && y2 < barra1Y + barraAlt) {
            dx2 = -dx2;
        } 
        else {
        	
    		x2=canvas.width/2;
			y2= (canvas.height/2)-distOffset;

			//rand = Math.random();
			if(rand<0.25){
				dx2=3;
				dy2=3;	
			}else if(rand < 0.5){
				dx2=-3;
				dy2=3;
			}else if(rand<0.75){
				dx2=-3;
				dy2=-3;
			}else{
				dx2=3;
				dy2=-3;
			}
			//barra1Y =  (canvas.height-barraAlt)/2;
			//barra2Y =  (canvas.height-barraAlt)/2;
    		
        }
    }else if(x2 + dx2 > canvas.width-radio){
    	if(y2 > barra2Y && y2 < barra2Y + barraAlt) {
            dx2 = -dx2;
        } else {

        	x2=canvas.width/2;
			y2=(canvas.height/2)-distOffset;
			//rand = Math.random();

			if(rand<0.25){
				dx2=3;
				dy2=3;	
			}else if(rand < 0.5){
				dx2=-3;
				dy2=-3;
			}else if(rand<0.75){
				dx2=-3;
				dy2=-3;
			}else{
				dx2=3;
				dy2=-3;
			}

		
			//barra1Y =  (canvas.height-barraAlt)/2;
			//barra2Y =  (canvas.height-barraAlt)/2;
        }
    }
    
    x2 += dx2;
	y2 += dy2;

	//dx += aceleracion; //GRAVEDAD :)
	//dy += aceleracion;

	if(autoMove == true){
		barra1Y = y2 -barraAlt/2;
		barra2Y = y2 -barraAlt/2;
	}

	dx2 = dx2 +(dx2/Math.abs(dx2))*aceleracion ;
	dy2 = dy2 + (dy2/Math.abs(dy2))*aceleracion ;


	dx = dx +(dx/Math.abs(dx))*aceleracion ;
	dy = dy + (dy/Math.abs(dy))*aceleracion ;
	console.log(dx);
	
}



function dibujarBarra1(){	
	ctx.beginPath();
    ctx.rect(0,barra1Y, barraAnc, barraAlt);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}
function dibujarBarra2(){	
	ctx.beginPath();
    ctx.rect(canvas.width-barraAnc,barra2Y, barraAnc, barraAlt);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function dibujarPelota(){
	ctx.beginPath();
	ctx.arc(x, y, radio, 0, Math.PI*2);
	ctx.fillStyle=ballColor;
	ctx.fill();
	ctx.closePath();
}

function dibujarPelota2(){
	ctx.beginPath();
	ctx.arc(x2, y2, radio, 0, Math.PI*2);
	ctx.fillStyle="black";
	ctx.fill();
	ctx.closePath();
}


function dibujar(){
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	
	if(arriba1 && barra1Y < canvas.height-barraAlt){
		barra1Y += 9;
	}
	else if(abajo1 && barra1Y > 0){
		barra1Y -= 9;
	}
	if(arriba2 && barra2Y < canvas.height-barraAlt){
		barra2Y += 9;
	}
	else if(abajo2 && barra2Y > 0){
		barra2Y -= 9;
	}


	dibujarBarra1();
	dibujarBarra2();
	dibujarPelota();
	//dibujarPelota2();
	rebote();
	document.getElementById("j1").innerHTML = "Puntos J1: "+puntos1;

	document.getElementById("j2").innerHTML = "Puntos J2: "+puntos2;
	vidas();
	//rebote2();

	document.getElementById('arka').onclick= MyFunction;
	function MyFunction(){
	window.location.href="Juego.html";
	}
	

	if(validation){
		requestAnimationFrame(dibujar);
	}
	
	
}

function switchColores(){

	if(ballColor == "red"){
		ballColor = "orange";	
	} else if(ballColor =="orange"){
		ballColor = "yellow";
	} else if(ballColor == "yellow"){
		ballColor = "lightgreen";
	} else if(ballColor =="lightgreen"){
		ballColor = "darkgreen";
	} else if(ballColor =="darkgreen"){
		ballColor = "darkblue";
	} else if(ballColor =="darkblue"){
		ballColor = "blue";
	} else if(ballColor =="blue"){
		ballColor = "purple";
	} else if(ballColor =="purple"){
		ballColor ="red";
	}
	var variable  ="border: 20px solid "+ballColor+";"; 
	canvas.style = variable;
}

setInterval(switchColores,1000);
dibujar();


