var svg;
var lastX;
var lastY;
var target;

function init()
{
        svg = document.getElementById("SVG_scene"); //GET MAIN SVG ELEMENT
        target = document.getElementById("maskDirt"); //GET MAIN SVG ELEMENT
    
    document.onmousedown = move;
}

function move(e)
{
    lastX=e.pageX;
    lastY=e.pageY;
    
    document.onmousemove = function(e) 
    {
        strokW = e.pageX -lastX;
        if(strokW < 0){strokW = strokW *-1}
        
        drawPixel(target,e.pageX,e.pageY,strokW)
        lastX=e.pageX;
        lastY=e.pageY;
    }
    
       document.onmouseup  = function() {
        document.onmousemove = null
    }
}

function drawPixel(SVGRoot, x, y,width) {
	var pixel = document.createElementNS("http://www.w3.org/2000/svg", "line");

	pixel.setAttribute('style', "stroke: white");
	pixel.setAttributeNS(null,"stroke-width",20);  //OUTLINE COLOR
	pixel.setAttribute('x1', lastX);
	pixel.setAttribute('y1', lastY);
    pixel.setAttribute('x2', x);
	pixel.setAttribute('y2', y);
	
	SVGRoot.appendChild(pixel);
}