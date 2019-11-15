var canvas=document.getElementById("miJuego");
var ctx=canvas.getContext("2d");

var x=canvas.width/2;
var y= canvas.height-30;
var dx=3;
var dy=-3;

var radio=10;
var aceleracion =0.0005;
var barraAlt = 10;
var barraAnc = 75;
var barraX = (canvas.width-barraAnc)/2;


var derecha= false;
var izquierda= false;

var count=0;
var puntos=0;
var vidas=3;
var count1=0;
var ganador=0;

var validation=true;

var autoMove=0;
var pausa=false;
var coliders=false;
var ballColor="red";

var pique =false;
var rebot0=false;

var destino= Math.random();
var azar1=0;
var azar2=0;
var color=0;
var teoremaDeLosColores=0;
var celdas=[];
var estados=[];

var ladrilloFila =5;
var ladrilloCol =5;
var ladrilloAnc = 75;
var ladrilloAlt = 20;
var ladrilloPadd = 10;
var ladrilloEspSup = 30;
var ladrilloEspIzq = 30;
var audio1 = 0;
var ladrillos = [];
for(i=0; i<ladrilloCol; i++) {
    ladrillos[i] = [];
    for(p=0; p<ladrilloFila; p++) {
        ladrillos[i][p] = { x: 0, y: 0, estado: 0, id: (i*ladrilloFila)+p };
    }
}

if(0<=destino && destino <=(1/2)){
	dx=-dx;
}


function reset(celdas){
	x=canvas.width/2;
	y= canvas.height-30;
	dx=3;
	dy=-3;
	count=0;
	puntos=0;
	vidas=3;
	destino= Math.random();
	if(0<=destino && destino <=(1/2)){
	dx=-dx;
	}
	barraX = (canvas.width-barraAnc)/2;

	for(l=0; l<(ladrilloCol*ladrilloFila)+1;l++){
		for(i=0; i<ladrilloCol; i++){
			for(p=0; p<ladrilloFila; p++){
				if(ladrillos[i][p].estado>=0){
					var ladrilloX = i*(ladrilloAnc+ladrilloPadd)+ladrilloEspIzq;
					var ladrilloY = p*(ladrilloAlt+ladrilloPadd)+ladrilloEspSup;
					ladrillos[i][p].x =ladrilloX;
					ladrillos[i][p].y =ladrilloY;

					if(ladrillos[i][p].id==celdas[l]){
					ladrillos[i][p].estado=estados[l];

					ctx.beginPath();
					ctx.rect(ladrilloX, ladrilloY, ladrilloAnc, ladrilloAlt);

					switch(ladrillos[i][p].estado){

						case 1:	
						ctx.fillStyle = "blue";
						break;

						case 2:
						ctx.fillStyle = "yellow";
						break;

						case 3:
						ctx.fillStyle = "green";
						break;

						case 4: 
						ctx.fillStyle = "purple";
						break;

						case 5:
						ctx.fillStyle = "red";
						break;
						}




					//ctx.fillStyle = "blue";



					ctx.fill();
					ctx.closePath();

					ladrillos[i][p].estado=estados[l];

					}
				}
			}	
		}				
	}
}

function dibujarLadrillos1(celdas){

	for(l=0; l<celdas.length ;l++){
		
		for(i=0; i<ladrilloCol; i++){
			for(p=0; p<ladrilloFila; p++){
				if(ladrillos[i][p].estado>=1){
					var ladrilloX = i*(ladrilloAnc+ladrilloPadd)+ladrilloEspIzq;
					var ladrilloY = p*(ladrilloAlt+ladrilloPadd)+ladrilloEspSup;
					ladrillos[i][p].x =ladrilloX;
					ladrillos[i][p].y =ladrilloY;
					

						
					if(ladrillos[i][p].id==celdas[l] && ladrillos[i][p].estado>=1){
					ctx.beginPath();
					ctx.rect(ladrilloX, ladrilloY, ladrilloAnc, ladrilloAlt);



					switch(ladrillos[i][p].estado){

						case 1:	
						ctx.fillStyle = "blue";
						break;

						case 2:
						ctx.fillStyle = "yellow";
						break;

						case 3:
						ctx.fillStyle = "green";
						break;

						case 4: 
						ctx.fillStyle = "purple";
						break;

						case 5:
						ctx.fillStyle = "red";
						break;
						}




					ctx.fill();
					ctx.closePath();
					}
				}
			}	
		}				
	}
}

function dibujarLadrillos(){
	for(l=0; l<(ladrilloFila*ladrilloCol);l++){

		teoremaDeLosColores=(Math.random()*5)+1;

		color=Math.trunc(teoremaDeLosColores);	

		destino=Math.random()*((ladrilloFila*ladrilloCol)+1);
		azar=Math.trunc(destino);

		for(i=0; i<ladrilloCol; i++){
			for(p=0; p<ladrilloFila; p++){
				if(ladrillos[i][p].estado==0){
					var ladrilloX = i*(ladrilloAnc+ladrilloPadd)+ladrilloEspIzq;
					var ladrilloY = p*(ladrilloAlt+ladrilloPadd)+ladrilloEspSup;
					ladrillos[i][p].x =ladrilloX;
					ladrillos[i][p].y =ladrilloY;

					//destino=Math.random()*(ladrilloFila*ladrilloCol+1);
					//console.log(destino);
					console.log(color);

					if(ladrillos[i][p].id==azar && ladrillos[i][p].estado==0){	
						ctx.beginPath();
						ctx.rect(ladrilloX, ladrilloY, ladrilloAnc, ladrilloAlt);

						switch(color){

						case 1:	
						ctx.fillStyle = "blue";
						break;

						case 2:
						ctx.fillStyle = "yellow";
						break;

						case 3:
						ctx.fillStyle = "green";
						break;

						case 4: 
						ctx.fillStyle = "purple";
						break;

						case 5:
						ctx.fillStyle = "red";
						break;
						}
						ctx.fill();
						ctx.closePath();

						celdas[ (i*ladrilloFila)+p]=azar;
						estados[(i*ladrilloFila)+p]=color;
						ladrillos[i][p].estado=color;
					}
				}
			}
		}
	}
}






function colision(){
	for(i=0; i<ladrilloCol; i++){
		for(p=0; p<ladrilloFila; p++){
			var b=ladrillos[i][p];
			if(b.estado>=1){

				//rebote izquierda	
				if(pique==false && (x+radio) >= b.x && (x+radio) <= (b.x+(radio/2)) && y >= b.y && y <= (b.y + ladrilloAlt) && dx>0){
					dx=-dx;
					b.estado += (-1);
					puntos += 1;
					//console.log("entro 1");
					pique=true;
				}	

				//rebote derecha 			
				if(pique==false && (x-radio)<=(b.x + ladrilloAnc) && (x-radio)>=(b.x-(radio/2)+ladrilloAnc) && y >= b.y && y <= (b.y + ladrilloAlt) && dx<0){
					dx=-dx;
					b.estado += (-1);
					puntos += 1;
					//console.log("entro 2");
					pique=true;
				}

				
				//rebote arriba
				if(pique==false && x >= b.x && x <= (b.x + ladrilloAnc) && (y+radio) >= b.y && (y+radio) <= (b.y+(radio/2)) && dy >0){
					dy = -dy;
					b.estado += (-1) ;
					puntos +=1;
					//console.log("entro 3");
					pique=true;
				}

				//rebote abajo	
				if(pique==false && x >= b.x && x <= (b.x + ladrilloAnc) && (y-radio) <= (b.y+ladrilloAlt) && (y-radio)>=(b.y+ladrilloAlt-(radio/2)) && dy<0){
					dy = -dy;
					b.estado += (-1) ;
					puntos +=1;
					//console.log("entro 4");
					pique=true;
				}


				//rebotes de correccion(a evaluar desviacion), medidas en relacion a la pelota
				//rebote inferior derecho derecho
				if(pique==false && (x+(radio*Math.cos(Math.PI/8))) >=b.x && (x+(radio*Math.cos(Math.PI/8))) <= (b.x+(radio*Math.cos(Math.PI/8))) && (y+(radio*Math.sin(Math.PI/8))) >= (b.y) && (y+(radio*Math.sin(Math.PI/8))) <= (b.y +(radio*Math.sin(Math.PI/8))) ){
					dx=-dx;
					dy=-dy;
					b.estado += (-1);
					puntos += 1;
					console.log("entro 9");
					pique=true;
				}

				//rebote inferior derecho centro
				if(pique==false && (x+(radio*Math.cos(3*Math.PI/8))) >=b.x && (x+(radio*Math.cos(3*Math.PI/8))) <= (b.x+(radio*Math.cos(3*Math.PI/8))) && (y+(radio*Math.sin(3*Math.PI/8))) >= (b.y) && (y+(radio*Math.sin(3*Math.PI/8))) <= (b.y +(radio*Math.sin(3*Math.PI/8))) ){
					dx=-dx;
					dy=-dy;
					b.estado += (-1);
					puntos += 1;
					console.log("entro 10");
					pique=true;
				}

				//rebote inferior izquierdo centro
				if(pique==false && (x+(radio*Math.cos(5*Math.PI/8))) <=(b.x+ladrilloAnc) && (x+(radio*Math.cos(5*Math.PI/8))) >= (b.x+ladrilloAnc+(radio*Math.cos(5*Math.PI/8))) && (y+(radio*Math.sin(5*Math.PI/8))) >= (b.y) && (y+(radio*Math.sin(5*Math.PI/8))) <= (b.y +(radio*Math.sin(5*Math.PI/8))) ){
					dx=-dx;
					dy=-dy;
					b.estado += (-1);
					puntos += 1;
					console.log("entro 11");
					pique=true;
				}

				//rebote inferior izquierdo izquierda
				if(pique==false && (x+(radio*Math.cos(7*Math.PI/8))) <=(b.x+ladrilloAnc) && (x+(radio*Math.cos(7*Math.PI/8))) >= (b.x+ladrilloAnc+(radio*Math.cos(7*Math.PI/8))) && (y+(radio*Math.sin(7*Math.PI/8))) >= (b.y) && (y+(radio*Math.sin(7*Math.PI/8))) <= (b.y +(radio*Math.sin(7*Math.PI/8))) ){
					dx=-dx;
					dy=-dy;
					b.estado += (-1);
					puntos += 1;
					console.log("entro 12");
					pique=true;
				}

				//rebote superior izquierdo izquierda
				if(pique==false && (x+(radio*Math.cos(9*Math.PI/8))) <=(b.x+ladrilloAnc) && (x+(radio*Math.cos(9*Math.PI/8))) >= (b.x+ladrilloAnc+(radio*Math.cos(9*Math.PI/8))) && (y+(radio*Math.sin(9*Math.PI/8))) <= (b.y+ladrilloAlt) && (y+(radio*Math.sin(9*Math.PI/8))) >= (b.y+ladrilloAlt +(radio*Math.sin(9*Math.PI/8))) ){
					dx=-dx;
					dy=-dy;
					b.estado += (-1);
					puntos += 1;
					console.log("entro 13");
					pique=true;
				}

				//rebote superior izquierdo centro
				if(pique==false && (x+(radio*Math.cos(11*Math.PI/8))) <=(b.x+ladrilloAnc) && (x+(radio*Math.cos(11*Math.PI/8))) >= (b.x+ladrilloAnc+(radio*Math.cos(11*Math.PI/8))) && (y+(radio*Math.sin(11*Math.PI/8))) <= (b.y+ladrilloAlt) && (y+(radio*Math.sin(11*Math.PI/8))) >= (b.y+ladrilloAlt +(radio*Math.sin(11*Math.PI/8))) ){
					dx=-dx;
					dy=-dy;
					b.estado += (-1);
					puntos += 1;
					console.log("entro 14");
					pique=true;
				}

				//rebote superior derecho centro
				if(pique==false && (x+(radio*Math.cos(13*Math.PI/8))) >=(b.x) && (x+(radio*Math.cos(13*Math.PI/8))) <= (b.x+(radio*Math.cos(13*Math.PI/8))) && (y+(radio*Math.sin(13*Math.PI/8))) <= (b.y+ladrilloAlt) && (y+(radio*Math.sin(13*Math.PI/8))) >= (b.y+ladrilloAlt +(radio*Math.sin(13*Math.PI/8))) ){
					dx=-dx;
					dy=-dy;
					b.estado += (-1);
					puntos += 1;
					console.log("entro 15");
					pique=true;
				}

				//rebote superior derecho derecha
				if(pique==false && (x+(radio*Math.cos(13*Math.PI/8))) >=(b.x) && (x+(radio*Math.cos(13*Math.PI/8))) <= (b.x+(radio*Math.cos(13*Math.PI/8))) && (y+(radio*Math.sin(13*Math.PI/8))) <= (b.y+ladrilloAlt) && (y+(radio*Math.sin(13*Math.PI/8))) >= (b.y+ladrilloAlt +(radio*Math.sin(13*Math.PI/8))) ){
					dx=-dx;
					dy=-dy;
					b.estado += (-1);
					puntos += 1;
					console.log("entro 16");
					pique=true;
				}



				//rebote inferior derecho
				if(pique==false && (x-(radio/Math.sqrt(2))) <=(b.x+ladrilloAnc) && (x-(radio/Math.sqrt(2))) >= (b.x+ladrilloAnc-((radio/Math.sqrt(2)))) && (y-(radio/Math.sqrt(2))) <= (b.y+ladrilloAlt) && (y-(radio/Math.sqrt(2))) >= (b.y + ladrilloAlt-(radio/Math.sqrt(2)))){
					dx=-dx;
					dy=-dy;
					b.estado += (-1);
					puntos += 1;
					console.log("entro 8");
					pique=true;
				}	


				//rebote inferior izquierdo
				if(pique==false && (x+(radio/Math.sqrt(2))) >=b.x && (x+(radio/Math.sqrt(2))) <= (b.x+((radio/Math.sqrt(2)))) && (y-(radio/Math.sqrt(2))) <= (b.y+ladrilloAlt) && (y-(radio/Math.sqrt(2))) >= (b.y + ladrilloAlt-(radio/Math.sqrt(2)))){
					dx=-dx;
					dy=-dy;
					b.estado += (-1);
					puntos += 1;
					console.log("entro 7");
					pique=true;
				}

				//rebote superior derecho
				if(pique==false && (x-(radio/Math.sqrt(2))) <=(b.x+ladrilloAnc) && (x-(radio/Math.sqrt(2))) >= (b.x-((radio/Math.sqrt(2)))) && (y+(radio/Math.sqrt(2))) >= b.y && (y+(radio/Math.sqrt(2))) <= (b.y-(radio/Math.sqrt(2)))){
					dx=-dx;
					dy=-dy;
					b.estado += (-1);
					puntos += 1;
					console.log("entro 5");
					pique=true;
				}	

				//rebote superior izquierdo
				if(pique==false && (x+(radio/Math.sqrt(2))) >= b.x && (x+(radio/Math.sqrt(2))) <= (b.x+((radio/Math.sqrt(2)))) && (y+(radio/Math.sqrt(2))) >= b.y && (y+(radio/Math.sqrt(2))) <= (b.y + ladrilloAlt+(radio/Math.sqrt(2)))){
					dx=-dx;
					dy=-dy;
					b.estado += (-1);
					puntos += 1;
					console.log("entro 6");
					pique=true;
				}	

				if(pique==false && x > b.x && x < (b.x + ladrilloAnc) && y > b.y && y < (b.y + ladrilloAlt)){
					dy = -dy;
					b.estado += (-1) ;
					puntos +=1;
					pique=true;
				}	




					if(puntos==ganador){
						alert("HAS GANADO!");

					if(confirm("DESEA USTED JUGAR NUEVAMENTE?")){
							
						/*document.location.href="file:///C:/Proyecto%20tic3/Nivel%202.html";
						console.log("hola");*/

						/*var fileref=document.createElement('script');
						//fileref.setAttribute("type","text/javascript");
						fileref.src='Nivel2.js'
							
						//console.log(canvas);
						var suspect=document.body.childNodes[5];
						console.log(suspect);

						document.body.replaceChild(fileref, suspect);
 
						validation=false;

						/*newScript.setAttribute("src", "Nivel2.js");
						document.body.replaceChild(newScript,oldScript);*/
						//oldScript.setAttribute('src', 'Nivel2.js')
						//document.location.reload(true);*/
						document.location.reload();
					}
						

					else{
						if(confirm("VOLVER A JUGAR?")){
						
						document.location.reload();
						}
					}	
				}
			}	
		}
	}

	pique=false;
}


document.addEventListener("keydown", teclaPresionada, false);
document.addEventListener("keyup", teclaSinPresionar, false);
document.addEventListener("mousemove", movMouse, false);


function movMouse(event){
	
	if(validation){
		var posX= event.clientX - canvas.offsetLeft;
		if(posX > 0 && posX < canvas.width){
			barraX = posX - barraAnc/2;
		}
	}
}

function teclaPresionada(event){
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
	if(event.keyCode == 39){
		derecha = true;
	}else if(event.keyCode == 37){
		izquierda = true;
	}

	if(event.keyCode==65 && autoMove==0){
		autoMove=1;
	}else if(event.keyCode==65 && autoMove==1){
		autoMove=0;
	}

	if(event.keyCode==80 && pausa==false){
		pausa=true;
	}else if(event.keyCode==80 && pausa==true){
		pausa=false;
	}

	if(event.keyCode==67 && coliders==false){
		coliders=true;
	}else if(event.keyCode==67 && coliders==true){
		coliders=false;
	}

	if(event.keyCode==48){
		ballColor="red";
	}else if(event.keyCode==49){
		ballColor="blue";
	}else if(event.keyCode==50){
		ballColor="yellow";
	}else if(event.keyCode==51){
		ballColor="orange";
	}else if(event.keyCode==52){
		ballColor="green";
	}else if(event.keyCode==53){
		ballColor="black";
	}else if(event.keyCode==54){
		ballColor="grey";
	}else if(event.keyCode==55){
		ballColor="purple";
	}else if(event.keyCode==56){
		ballColor="pink";
	}else if(event.keyCode==57){
		ballColor="skyblue";
	}

console.log(ballColor);

}

function teclaSinPresionar(event){
	if(event.keyCode == 39){
		derecha = false;
	}else if(event.keyCode == 37){
		izquierda = false;
	}
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
	ctx.arc(x+(radio/(Math.sqrt(2))), y+(radio/(Math.sqrt(2))), 1, 0, Math.PI*2);
	ctx.fillStyle="green";
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();	
	ctx.arc(x+(radio/(Math.sqrt(2))), y-(radio/(Math.sqrt(2))), 1, 0, Math.PI*2);
	ctx.fillStyle="green";
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();	
	ctx.arc(x-(radio/(Math.sqrt(2))), y+(radio/(Math.sqrt(2))), 1, 0, Math.PI*2);
	ctx.fillStyle="green";
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();	
	ctx.arc(x-(radio/(Math.sqrt(2))), y-(radio/(Math.sqrt(2))), 1, 0, Math.PI*2);
	ctx.fillStyle="green";
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.arc(x+radio, y, 1, 0, Math.PI*2);
	ctx.fillStyle="green";
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();	
	ctx.arc(x-radio, y, 1, 0, Math.PI*2);
	ctx.fillStyle="green";
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();	
	ctx.arc(x, y+radio, 1, 0, Math.PI*2);
	ctx.fillStyle="green";
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.arc(x, y-radio, 1, 0, Math.PI*2);
	ctx.fillStyle="green";
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();	
	ctx.arc(x-(radio/(Math.sqrt(2))), y+(radio/(Math.sqrt(2))), 1, 0, Math.PI*2);
	ctx.fillStyle="green";
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();	
	ctx.arc(x+(radio*Math.cos(Math.PI/8)), y+(radio*Math.sin(Math.PI/8)), 1, 0, Math.PI*2);
	ctx.fillStyle="green";
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();	
	ctx.arc(x+(radio*Math.cos(3*Math.PI/8)), y+(radio*Math.sin(3*Math.PI/8)), 1, 0, Math.PI*2);
	ctx.fillStyle="green";
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();	
	ctx.arc(x+(radio*Math.cos(5*Math.PI/8)), y+(radio*Math.sin(5*Math.PI/8)), 1, 0, Math.PI*2);
	ctx.fillStyle="green";
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();	
	ctx.arc(x+(radio*Math.cos(7*Math.PI/8)), y+(radio*Math.sin(7*Math.PI/8)), 1, 0, Math.PI*2);
	ctx.fillStyle="green";
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();	
	ctx.arc(x+(radio*Math.cos(9*Math.PI/8)), y+(radio*Math.sin(9*Math.PI/8)), 1, 0, Math.PI*2);
	ctx.fillStyle="green";
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();	
	ctx.arc(x+(radio*Math.cos(11*Math.PI/8)), y+(radio*Math.sin(11*Math.PI/8)), 1, 0, Math.PI*2);
	ctx.fillStyle="green";
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();	
	ctx.arc(x+(radio*Math.cos(13*Math.PI/8)), y+(radio*Math.sin(13*Math.PI/8)), 1, 0, Math.PI*2);
	ctx.fillStyle="green";
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();	
	ctx.arc(x+(radio*Math.cos(15*Math.PI/8)), y+(radio*Math.sin(15*Math.PI/8)), 1, 0, Math.PI*2);
	ctx.fillStyle="green";
	ctx.fill();
	ctx.closePath();
}


function dibujarBarra(){	

	ctx.beginPath();
    ctx.rect(barraX, canvas.height-barraAlt, barraAnc, barraAlt);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

function rebote(){
	
	if(x + dx > canvas.width-radio || x + dx < radio) {
        dx = -dx;
    }
     if(y + dy < radio) {
        dy = -dy;
    }
    else if(y + dy < canvas.height-radio && y + dy > canvas.height-((3/2)*radio)){
    	if(x-radio <= barraX + barraAnc && x-radio >= (barraX + barraAnc - radio) && reboto==false){
        	dy=-dy;
        	dx=-dx;
        	reboto=true;
        }

        else if(x+radio >= barraX && x+radio <= barraX + radio &&  reboto==false){
        	dy=-dy;
        	dx=-dx;
        	reboto=true;
        }

       else if(x >= barraX && x < (barraX + 15) &&  reboto==false){
        	dy=-(0.1+dy);
        	dx=(dx-0.1);
        	reboto=true;
        	console.log("hola2");

        }
        else if(x >= (barraX + 15) && x < (barraX + 30) && reboto==false){
        	dy=-(dy-0.1);
        	dx=0.1+dx;
        	reboto=true;
        	//console.log("hola1");

        }
        else if(x >= (barraX + 30) && x < (barraX + 45) && reboto==false){
        	dy=-dy;
        	dx=dx;
        	reboto=true;
        	//console.log("hola");
        }
        else if(x >= (barraX + 45) && x < (barraX + 60) && reboto==false){
        	dy=-(dy-0.1);
        	dx=0.1+dx;
        	reboto=true;
        	//console.log("hola3");
        }
        else if(x >= (barraX + 60) && x <= (barraX + 75) &&  reboto==false){
        	dy=-(dy+0.1);
        	dx=dx-0.1;
        	reboto=true
        	//console.log("hola4");
        }
    }
    else if(y + dy > canvas.height-radio) {
        /*if(x > barraX && x < barraX + barraAnc) {
            dy = -dy;
        }*/
        
        
        	vidas -=1;
        	if(!vidas){
        		if(count==0){
           		 alert("FIN DEL JUEGO");
            	count += 1;
        		}
        		if(count ==1){
        			if(confirm("Intentar de nuevo?") /*&& count == 1*/){
        			count += 1;
        	    	//document.location.reload();
        	    	reset(celdas);
        	    	//dibujar();
        			}
        		}
    		}
    		else{
    		 	x=canvas.width/2;
			 	y= canvas.height-30;
			 	dx=3;
			 	dy=-3;
				barraX = (canvas.width-barraAnc)/2;
				destino=Math.random();
				if(0<=destino && destino <=(1/2)){
					dx=-dx;
				}

    		}
        }
    
    if(autoMove==1){
   		barraX=x + dx - 37;
	}
	//console.log(dx);
	//console.log(dy)
    x += dx;
	y += dy;

	reboto=false;



	dx = dx +(dx/Math.abs(dx))*aceleracion ;
	dy = dy + (dy/Math.abs(dy))*aceleracion ;
	
}

function dibujar(){

if(pausa==false){	
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if(count1==0){
		dibujarLadrillos();
		for(k=0;k<celdas.length;k++){
			if(celdas[k]!=undefined){
				for(i=0; i<ladrilloCol; i++){
					for(p=0; p<ladrilloFila; p++){
						if(ladrillos[i][p].id==celdas[k]){
							ganador+=ladrillos[i][p].estado;
						}	
					}
				}
			}
		} 
		count1=1;
	}
	
	dibujarLadrillos1(celdas);
	

	rebote();



	if(derecha && barraX < canvas.width-barraAnc){
		barraX += 7;
	}
	else if(izquierda && barraX > 0){
		barraX -= 7;
	}


	dibujarBarra();
	dibujarPelota();

	if(coliders==false){
	dibujarPelota2();
	}

	colision();

}

	document.getElementById('pong').onclick= MyFunction;
	function MyFunction(){
	window.location.href="Pong.html";
	}

	document.getElementById("puntaje").innerHTML = "Puntos: "+puntos;

	document.getElementById("vidas").innerHTML = "Vidas: "+vidas;
	
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




/*
ejemplo para dibujar rectancgulos y la pelota.
ctx.beginPath();
ctx.rect(20,40,30,30);
ctx.fillStyle="rgba(0,0,255,0.5)";
ctx.fill();
ctx.closePath();



ctx.beginPath();
ctx.arc(240,160,20,0,2*Math.PI,false);
ctx.fillStyle="green";
ctx.fill();
ctx.closePath();
*/

