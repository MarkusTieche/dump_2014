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
var translateX =0; //X TRANSFORM
var translateY =0; //Y TRANSFORM
var ctx; //CANVAS CONTEXT
var animate = false; //CONVERT ANIMATION?

function init()
{
            
    //DRAW CIRCLE ONTO CANVAS
    ctx = canvas.getContext('2d');
    ctx.canvas.width  = document.getElementById("svgWrapper").offsetWidth;
    ctx.canvas.height = document.getElementById("svgWrapper").offsetHeight;
    
    //DRAW A CIRCLE ONTO THE CANVAS 
    ctx.beginPath();
    ctx.arc(60, 60, 50, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    
    //START RENDER
    render();
    
    
}

function renderSVG()
{
    var svg =  document.getElementById('SVG_scene'); //GET SVG SCENE
    var remove = svg.getElementsByTagName("image"); //CHECK IF THERE IS ALREADY AN IMAGE
    
    //IF THERE IS AN IMAGE WE REMOVE IT
    if(remove.length>0)
    {
        svg.removeChild( remove[0])
    }
    
    //CREATE DATA FILE FROM CANVAS ELEMENT
    var img_dataurl = document.getElementById('canvas').toDataURL("image/png");
    
    //CREATE A SVG ELEMENT
    var svg_img = document.createElementNS("http://www.w3.org/2000/svg", "image");
        svg_img.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", img_dataurl); //CREATE SVG IMAGE OBJECT
        svg_img.setAttributeNS(null,"width",document.getElementById("svgWrapper").offsetWidth); //CENTER OF THE CIRCLE Y
        svg_img.setAttributeNS(null,"height",document.getElementById("svgWrapper").offsetHeight); //CENTER OF THE CIRCLE Y

    //APPEND SVG ELEMENT
    svg.appendChild(svg_img);
}

//START OR STOP ANIMATION
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
    //IF IT IS AN ANIMATION RENDER EACH FRAME ONTO SVG
    if(animate)
    {
       renderSVG();
    }
    
    //CLEAR CANVAS
    ctx.clearRect(10+translateX, 10+translateY, 100,100);
    
    //GET POSITION OF COLLIDER
    translateX += dx;
    translateY += dy;
    
    //DRAW AT NEW POSITION ONTO THE CANVAS
    ctx.beginPath();
    ctx.arc(60+translateX, 60+translateY, 50, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    
    //CREATE BOUNDARIES 
    if( translateX<0 || translateX>document.getElementById("svgWrapper").offsetWidth-100) dx =-dx; 
    if( translateY<0 || translateY>document.getElementById("svgWrapper").offsetHeight-100) dy =-dy; 
    
    requestAnimationFrame( render );//KEEP ANIMATING
}