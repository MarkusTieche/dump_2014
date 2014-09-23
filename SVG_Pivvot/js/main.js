(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

var SVG;
var stats;

var elapsed = 0;
var time;
var duration;
var w;
var h;


function init()
{
      window.scrollTo(0,1);
    
    w = window.innerWidth/2;
    h = window.innerHeight/2;
    
    SVG = document.getElementById("SVG_scene");
    createScreen();
    initPath();
    initObjstacles();
    
    render();
}

var ObstacleArray = [];//pool
var ObstaclesPlaced = 0;
var maxObstacles = 5;
var resetTimer = 0;
var collide = false;


function initObjstacles()
{
    createObstacles();
}

function createScreen()
{
    var svgNS = "http://www.w3.org/2000/svg";   //DEFINE THE namespaceURI
    var center = document.createElementNS(svgNS,"rect"); //CREATE BASIC SVG ELEMENT(RECT, CIRCLE, ELLIPSE, LINE, POLYLINE, POLYGON)
        center.setAttributeNS(null,"x",w-150); //CENTER OF THE CIRCLE X
        center.setAttributeNS(null,"y",h-100); //CENTER OF THE CIRCLE Y
        center.setAttributeNS(null,"width",300);   //RADIUS OF THE CIRCLE
        center.setAttributeNS(null,"height",200);   //RADIUS OF THE CIRCLE
        center.setAttributeNS(null,"stroke","black");  //OUTLINE COLOR
        center.setAttributeNS(null,"fill","#3fb591");  //OUTLINE COLOR
    
    
    var centerPoint = document.createElementNS(svgNS,"circle"); //CREATE BASIC SVG ELEMENT(RECT, CIRCLE, ELLIPSE, LINE, POLYLINE, POLYGON)
        centerPoint.setAttributeNS(null,"cx",w); //CENTER OF THE CIRCLE X
        centerPoint.setAttributeNS(null,"cy",h); //CENTER OF THE CIRCLE Y
        centerPoint.setAttributeNS(null,"r",5);   //RADIUS OF THE CIRCLE
        centerPoint.setAttributeNS(null,"fill","black");  //OUTLINE COLOR


        SVG.appendChild(center)
        SVG.appendChild(centerPoint)
}

function render()
{       
    var now = new Date().getTime(), //GET CURRENT TIME
        dt = now - (time || now); //FRAME TIME
        elapsed += dt/1000; //ELAPSED TIME SINCE ANIMATION START
    var t = elapsed / duration; //RUNNING TIME OF THE FULL ANIMATION
    var percent = t * 100; 
        time = now;
    
    if(t >= 1){elapsed = 0;}
 
    var pos = path.getPointAtLength( length * percent/100 ); //GET POSITION A CURRENT PERCENTAGE
    pathWrapper.setAttribute("transform", "translate("+ Math.round(pos.x-w)*-1 +" "+ Math.round(pos.y-h)*-1 +")");
 updateObstacle(dt)
//    pathWrapper.style.WebkitTransform = "translate("+(pos.x-w)*-1+"px,"+(pos.y-h)*-1 +"px)";
    path.pos = {x:(pos.x-w)*-1,y:(pos.y-h)*-1}
    
     requestAnimationFrame(render);    
}

function createObstacles()
{
   var svgNS = "http://www.w3.org/2000/svg";   //DEFINE THE namespaceURI
    
    ObstacleArray = [];
    
    for (var i = 0; i < 5; i++) 
    { 
        var Obstacle = document.createElementNS(svgNS,"circle"); //CREATE BASIC SVG ELEMENT(RECT, CIRCLE, ELLIPSE, LINE, POLYLINE, POLYGON)
            Obstacle.setAttributeNS(null,"class","circle"); //CLASS OF THE CIRCLE, OBJECT CAN BE MODIFIED VIA CSS
            Obstacle.setAttributeNS(null,"cx",0); //CENTER OF THE CIRCLE X
            Obstacle.setAttributeNS(null,"cy",0); //CENTER OF THE CIRCLE Y
            Obstacle.setAttributeNS(null,"r",10);   //RADIUS OF THE CIRCLE
            Obstacle.setAttributeNS(null,"fill","black");   //FILLCOLOR
            Obstacle.setAttributeNS(null,"stroke","none");  //OUTLINE COLOR
            Obstacle.pos = {x:0,y:0};  //OUTLINE COLOR
            Obstacle.shown = false;
       
        
        ObstacleArray.push(Obstacle)
 
            pathWrapper.appendChild(Obstacle); //ADD CIRCLE TO THE MAIN SVG ELEMENT
        
    }
    
    placeObstacle(w,5)
}

function placeObstacle(t,n)
{
    for (var i = 0; i < n; i++) 
    { 
        
        
        var pos = path.getPointAtLength(t+(i*w/6));
        var p0 = path.getPointAtLength(t+(i*450)-1 ) //GET POINT BEFORE
        var p1 = path.getPointAtLength(t+(i*450)+1 ) //GET POINT AFTER
        var angle = Math.atan2(p1.y-p0.y,p1.x-p0.x)*180 / Math.PI; //GET ANGLE
        
        
        ObstacleArray[i].setAttributeNS(null,"cx",pos.x); 
        ObstacleArray[i].setAttributeNS(null,"cy",pos.y);
        
        ObstacleArray[i].pos = {x:pos.x,y:pos.y};
        ObstaclesPlaced += 1;
    }
}

var resetTimer = 0;

function updateObstacle(dt)
{
    var t = elapsed / duration; //RUNNING TIME OF THE FULL ANIMATION
    var percent = t; //CURRENT PERCENTAGE OF THE PATH
    
    resetTimer += dt/1000;
    
//    //CHECK FOR COLLISION
    if(ObstacleArray.length >= 5){
       for (var i = 0; i < 5; i++) 
        {
            if(ObstacleArray[i].pos.y-path.pos.y*-1 <= h+100 && ObstacleArray[i].pos.y-path.pos.y*-1 >= h-100 && ObstacleArray[i].pos.x-path.pos.x*-1 <= w+150 && ObstacleArray[i].pos.x-path.pos.x*-1 >= w-150) //IS OUT OF SCREEN TOP/BOTTOM
            {
//                console.log("kill "+i)
                ObstacleArray[i].setAttributeNS(null,"fill","red"); 
                ObstacleArray[i].shown = true;
            }
            else
            {
                ObstacleArray[i].setAttributeNS(null,"fill","black"); 
                
                if(ObstacleArray[i].shown && resetTimer > 1)
                {
                    var next = (length * percent)+h;
                    if(next > length){next -= length}
                    var pos = path.getPointAtLength(next);
                    
                    //KEEP MIN DISTANCE
                    
                    ObstacleArray[i].setAttributeNS(null,"cx",pos.x); 
                    ObstacleArray[i].setAttributeNS(null,"cy",pos.y);
        
                    ObstacleArray[i].pos = {x:pos.x,y:pos.y};
                    
                    ObstacleArray[i].shown = false;
                    resetTimer = 0;
                }
            }

        }
    }
}

var pathWrapper;
var pathColor;
var splineArray = [];
var precision = 15;
var size;
var t = 0.5;
var length;
var path;

function initPath()
{
    size = w/2;
    console.log(h)
    
    createPath();
}

function createPath()
{
    var svgNS = "http://www.w3.org/2000/svg";   //DEFINE THE namespaceURI
    
    pathWrapper = document.createElementNS(svgNS,"g")
    pathWrapper.setAttributeNS(null,"id","pathWrapper"); //PATH
 
    
    SVG.appendChild(pathWrapper)
    
     //CALCULATE OUTLINE POINTS OF A CIRCLE OR A PATH
    for (var i = 0; i < precision; i++) 
    {
        var xValues =( w + size * Math.cos(2 * Math.PI * i / precision))+Math.random()*size/4;
        var yValues = (h  + size * Math.sin(2 * Math.PI * i / precision))+Math.random()*size/4;
        
        //PUSH POINTS TO THE ARRAY
        splineArray.push(Math.round(xValues));
        splineArray.push(Math.round(yValues));
    }
    
     drawSpline(splineArray,t);
}

function getControlPoints(x0,y0,x1,y1,x2,y2,t){
    //  x0,y0,x1,y1 are the coordinates of the end (knot) pts of this segment
    //  x2,y2 is the next knot -- not connected here but needed to calculate p2
    //  p1 is the control point calculated here, from x1 back toward x0.
    //  p2 is the next control point, calculated here and returned to become the 
    //  next segment's p1.
    //  t is the 'tension' which controls how far the control points spread.
    
    //  Scaling factors: distances from this knot to the previous and following knots.
    var d01=Math.sqrt(Math.pow(x1-x0,2)+Math.pow(y1-y0,2));
    var d12=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
   
    var fa=t*d01/(d01+d12);
    var fb=t-fa;
  
    var p1x=x1+fa*(x0-x2);
    var p1y=y1+fa*(y0-y2);

    var p2x=x1-fb*(x0-x2);
    var p2y=y1-fb*(y0-y2);  
    
    return [Math.round(p1x),Math.round(p1y),Math.round(p2x),Math.round(p2y)]
}

function drawSpline(pts,t){
    var cp=[];   // array of control points, as x0,y0,x1,y1,...
    var n=pts.length;
    path = document.createElementNS("http://www.w3.org/2000/svg","path");
    var pathSegment = "";
    
        
        //   Append and prepend knots and control points to close the curve
        
        pts.push(pts[0],pts[1],pts[2],pts[3]);
        pts.unshift(pts[n-1]);
        pts.unshift(pts[n-1]);
        for(var i=0;i<n;i+=2){
            cp=cp.concat(getControlPoints(pts[i],pts[i+1],pts[i+2],pts[i+3],pts[i+4],pts[i+5],t));
        }
        cp=cp.concat(cp[0],cp[1]);   
        for(var i=2;i<n+2;i+=2){
            pathSegment += "M"+pts[i]+" "+pts[i+1]+" C"+cp[2*i-2]+" "+cp[2*i-1]+" "+cp[2*i]+" "+cp[2*i+1]+" "+pts[i+2]+" "+pts[i+3];
            
        var pathSeg = document.createElementNS("http://www.w3.org/2000/svg","path");
            pathSeg.setAttributeNS(null,"d","M"+pts[i]+" "+pts[i+1]+" C"+cp[2*i-2]+" "+cp[2*i-1]+" "+cp[2*i]+","+cp[2*i+1]+" "+pts[i+2]+" "+pts[i+3]); //PATH
            pathSeg.setAttributeNS(null,"fill","none"); //PATH
            pathSeg.setAttributeNS(null,"stroke","blue"); //PATH
            pathSeg.setAttributeNS(null,"stroke-width","2px"); //PATH
//            pathWrapper.appendChild(pathSeg);
        }
    
        path.setAttributeNS(null,"d",pathSegment); //PATH
        path.setAttributeNS(null,"fill","none"); //PATH
        path.setAttributeNS(null,"stroke","white"); //PATH
        path.setAttributeNS(null,"stroke-width","5px"); //PATH
        path.pos = {x:0,y:0}; //PATH
        pathWrapper.appendChild(path);
        SVG.appendChild(pathWrapper);
    
        
        length = path.getTotalLength(); //GET TOTAL LENGHT OF THE PATH
        duration = length/100;
        var pos = path.getPointAtLength( 0 ); //GET POSITION A CURRENT Frame
        pathWrapper.setAttribute("transform", "translate("+ (pos.x-w)*-1 +" "+ (pos.y-h)*-1 +")");
    path.pos = {x:(pos.x-w)*-1,y:(pos.y-h)*-1}
    render();
}

function updatePath()
{
}