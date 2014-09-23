var ballsArray =[];
var maxBalls = 5;
var speedLimit = 4;

 window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

function init()
{
	
    
    initBalls();//INIT BALLS & PHYSICS
	
	//tick();//START RENDER-TICK
}

function initBalls()
{
    var minDist = window.innerHeight / maxBalls;
	//ADD maxBalls
	for (var i=0;i<maxBalls;i++)
	{ 
		var ball = document.createElement("div");
			ball.className ="ball";
			
			ball.left =Math.round(Math.random()*window.innerWidth-30);
			//ball.top = Math.round(Math.random()*390);
            ball.top = Math.random() * (i*minDist+50 - i*minDist) + i*minDist;
        console.log(ball.top)
			ball.collision = 0;
    		ball.mass = 1;
    		ball.xspeed = Math.round(Math.random()*8-4);
    		ball.yspeed = Math.round(Math.random()*8-4);
			
			
			document.getElementById('wrapper').appendChild(ball);
			
			ballsArray.push(ball);
	}
	if(ballsArray.length == maxBalls){tick();}
}

function addSpeed()
{
}

function moveBall()
{		
		for (var i=0;i<maxBalls;i++)
		{ 
			if (ballsArray[i].left<0) {ballsArray[i].left = 0;ballsArray[i].xspeed *= -1;}		// BOUNDRIES Left
			if (ballsArray[i].left>window.innerWidth-30) {ballsArray[i].left = window.innerWidth-30;ballsArray[i].xspeed *= -1;}	// BOUNDRIES Right
			if (ballsArray[i].top<0) {ballsArray[i].top = 0;ballsArray[i].yspeed *= -1;}		// BOUNDRIES Top
			if (ballsArray[i].top>window.innerHeight-30) {ballsArray[i].top = innerHeight-30;ballsArray[i].yspeed *= -1;}	// BOUNDRIES Bottom
			
			//GET THE NEW POSITION
			ballsArray[i].left += ballsArray[i].xspeed;
			ballsArray[i].top += ballsArray[i].yspeed;
			
			//APPLY THE NEW POSITION
			//ballsArray[i].style.WebkitTransform = "translate("+ballsArray[i].left+"px,"+ballsArray[i].top+"px)";//2D Transform
			ballsArray[i].style.WebkitTransform = "translate3D("+ballsArray[i].left+"px,"+ballsArray[i].top+"px,0px)";//3D Transform fo better Performance?? -> "testing"
            ballsArray[i].style.MozTransform = "translate3D("+ballsArray[i].left+"px,"+ballsArray[i].top+"px,0px)";
		}
   		//ball.style.WebkitTransform = "translate("+ball.dx+"px,"+ball.dy+"px)";
}

function manage_bounce(ball, ball2) {
    dx = ball.left-ball2.left;
    dy = ball.top-ball2.top;
    collisionision_angle = Math.atan2(dy, dx);
    magnitude_1 = Math.sqrt(ball.xspeed*ball.xspeed+ball.yspeed*ball.yspeed);
    magnitude_2 = Math.sqrt(ball2.xspeed*ball2.xspeed+ball2.yspeed*ball2.yspeed);
    direction_1 = Math.atan2(ball.yspeed, ball.xspeed);
    direction_2 = Math.atan2(ball2.yspeed, ball2.xspeed);
    new_xspeed_1 = magnitude_1*Math.cos(direction_1-collisionision_angle);
    new_yspeed_1 = magnitude_1*Math.sin(direction_1-collisionision_angle);
    new_xspeed_2 = magnitude_2*Math.cos(direction_2-collisionision_angle);
    new_yspeed_2 = magnitude_2*Math.sin(direction_2-collisionision_angle);
    final_xspeed_1 = ((ball.mass-ball2.mass)*new_xspeed_1+(ball2.mass+ball2.mass)*new_xspeed_2)/(ball.mass+ball2.mass);
    final_xspeed_2 = ((ball.mass+ball.mass)*new_xspeed_1+(ball2.mass-ball.mass)*new_xspeed_2)/(ball.mass+ball2.mass);
    final_yspeed_1 = new_yspeed_1;
    final_yspeed_2 = new_yspeed_2;
    ball.xspeed = Math.cos(collisionision_angle)*final_xspeed_1+Math.cos(collisionision_angle+Math.PI/2)*final_yspeed_1;
    ball.yspeed = Math.sin(collisionision_angle)*final_xspeed_1+Math.sin(collisionision_angle+Math.PI/2)*final_yspeed_1;
    ball2.xspeed = Math.cos(collisionision_angle)*final_xspeed_2+Math.cos(collisionision_angle+Math.PI/2)*final_yspeed_2;
    ball2.yspeed = Math.sin(collisionision_angle)*final_xspeed_2+Math.sin(collisionision_angle+Math.PI/2)*final_yspeed_2;
}


function tick()
{
    moveBall();
    
    for (x=0; x<=maxBalls; x++) 
     {
        for (y=x+1; y<maxBalls; y++) 
        {
        	distance_x = Math.abs(ballsArray[x].left-ballsArray[y].left);
        	distance_y = Math.abs(ballsArray[x].top-ballsArray[y].top);
        	distance = Math.sqrt(distance_x*distance_x+distance_y*distance_y);
        	
        	if (distance<=31 && (ballsArray[x].collision == 0 || ballsArray[y].collision == 0)) 
        	{
        		ballsArray[x].collision = 1;
                ballsArray[y].collision = 1;
                manage_bounce(ballsArray[x], ballsArray[y]);
        	}
        	else if (distance>31) 
        	{
                ballsArray[x].collision = 0;
                ballsArray[y].collision = 0;
            }
        	
        	//window.console.log(distance)
        }
     }
    
    requestAnimFrame( tick );//RUN THE NEXT TICK
}
