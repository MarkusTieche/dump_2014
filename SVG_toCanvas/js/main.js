if ( !window.requestAnimationFrame ) {
 
    window.requestAnimationFrame = ( function() {
 
        return window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
 
            window.setTimeout( callback, 1000 / 60 );
 
        };
 
    } )();
 
}

var dx = 5; //X SPEED
var dy = 5; //Y SPEED
var collider; //SVG OBJECT
var ctx; //CANVAS CONTEXT
var svg; //MAIN SVG ELEMENT
var animate = false; //CONVERT ANIMATION?

function init()
{
      svg = document.getElementById("SVG_scene"); //GET MAIN SVG ELEMENT
    var svgNS = "http://www.w3.org/2000/svg";   //DEFINE THE namespaceURI
    
    var w = window.innerWidth;
    var h = window.innerHeight;
    
    //SET CANVAS DIMENSIONS
     var canvas = document.getElementById("canvas");
         canvas.width =w/2;
         canvas.height =h;
    
    
        collider = document.createElementNS(svgNS,"circle"); //CREATE BASIC SVG ELEMENT(RECT, CIRCLE, ELLIPSE, LINE, POLYLINE, POLYGON)
        collider.setAttributeNS(null,"cx",60); //CENTER OF THE CIRCLE X
        collider.setAttributeNS(null,"cy",60); //CENTER OF THE CIRCLE Y
        collider.setAttributeNS(null,"r",50);   //RADIUS OF THE CIRCLE
        collider.setAttributeNS(null,"fill","white");   //FILLCOLOR
        collider.setAttributeNS(null,"stroke","none");  //OUTLINE COLOR
        collider.dx = 0; //X transform
        collider.dy = 0; //Y transform
    
        
    //CANVAS CONTEXT2D
    ctx = canvas.getContext('2d');
    
    //ADD SVG ELEMENT TO SCENE
    svg.appendChild(collider)
    
    //START RENDER
    render();
}

//RENDER SVG ONTO CANVAS
function renderCanvas()
{
    //CREATE XML FROM THE SVG OBJECT
    var oSerializer = new XMLSerializer();
    var sXML = oSerializer.serializeToString(svg);
    
    //DRAW XML ONTO THE CANVAS ELEMENT
    canvg(document.getElementById('canvas'), sXML,{ ignoreMouse: true, ignoreAnimation: true })
}

//START AND STOP ANIMATION
function animateCanvas(e)
{
    if(animate)
    {
        animate = false;
        e.target.innerHTML = "animate on canvas";
    }
    else
    {
        animate = true;
        e.target.innerHTML = "stop animation";
    }
}

function render()
{
    //IF IT IS AN ANIMATION RENDER EACH FRAME ONTO CANVAS
    if(animate)
    {
        renderCanvas();
    }
    
    //GET POSITION OF COLLIDER
    collider.dx += dx;
    collider.dy += dy;
    
    //UPDATE POSITION OF CILLIDER
    collider.setAttribute("transform", "translate("+collider.dx+" "+collider.dy+")");
    
    //CREATE BOUNDARIES 
    x = collider.dx + collider.getBBox().x;
    y = collider.dy + collider.getBBox().y;
    
    if( x<0 || x>document.getElementById("svgWrapper").offsetWidth-100) dx =-dx; 
    if( y<0 || y>document.getElementById("svgWrapper").offsetHeight-100) dy =-dy; 
    
    requestAnimationFrame( render );//KEEP ANIMATING
}