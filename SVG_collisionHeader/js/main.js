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

var collider; //THE MAIN COLLIDER OBJECT WHICH COLLIDE WITH THE COLLISION GROUP
var collisionGroup= []; //ARRAY OF OBJECT WICH CAN COLLIDE WITH THE COLLIDER
var precision = 20; //PRECISION IN PERCENTAGE
var svg;
var dx = 5;
var dy = 5;

function init()
{
    svg = document.getElementById("SVG_scene"); //GET MAIN SVG ELEMENT
    var svgNS = "http://www.w3.org/2000/svg";   //DEFINE THE namespaceURI
    
    var w = window.innerWidth;
    var h = window.innerHeight;
    
    collider = document.createElementNS(svgNS,"g")
    
        colliderObj = document.createElementNS(svgNS,"circle"); //CREATE BASIC SVG ELEMENT(RECT, CIRCLE, ELLIPSE, LINE, POLYLINE, POLYGON)
        colliderObj.setAttributeNS(null,"cx",w/2); //CENTER OF THE CIRCLE X
        colliderObj.setAttributeNS(null,"cy",h/2); //CENTER OF THE CIRCLE Y
        colliderObj.setAttributeNS(null,"r",50);   //RADIUS OF THE CIRCLE
        colliderObj.setAttributeNS(null,"fill","white");   //FILLCOLOR
        colliderObj.setAttributeNS(null,"fill-opacity","0.5");   //FILLCOLOR
        colliderObj.setAttributeNS(null,"stroke","none");  //OUTLINE COLOR
        collider.dx = 0;
        collider.dy = 0;
    collider.appendChild(colliderObj)
    
    svg.appendChild(collider);
    drawCollider(collider)
    //CREATE COLLISION GROUP
    for (var i=0;i<3;i++)
    { 
        var r = (Math.random()*h/100*20)+h/50*2;
        
        var collision = document.createElementNS(svgNS,"g")
        var collisionObj = document.createElementNS(svgNS,"circle"); //CREATE BASIC SVG ELEMENT(RECT, CIRCLE, ELLIPSE, LINE, POLYLINE, POLYGON)
            collisionObj.setAttributeNS(null,"cx",r+(Math.random()*w)-r); //CENTER OF THE CIRCLE X
            collisionObj.setAttributeNS(null,"cy",r+(Math.random()*h)-r); //CENTER OF THE CIRCLE Y
            collisionObj.setAttributeNS(null,"r",r);   //RADIUS OF THE CIRCLE
            collisionObj.setAttributeNS(null,"fill","#22907f");   //FILLCOLOR
            collisionObj.setAttributeNS(null,"stroke","none");  //OUTLINE COLOR
        
        collision.appendChild(collisionObj);
        svg.insertBefore(collision,collider)
        collisionGroup.push(collision);
        
        var collisionBounds = document.createElementNS(svgNS,"rect");
            collisionBounds.setAttributeNS(null,"id","collisionBounds"); //ID OF THE CIRCLE, OBJECT CAN BE MODIFIED VIA CSS
            collisionBounds.setAttributeNS(null,"x",collision.getBBox().x);
            collisionBounds.setAttributeNS(null,"y",collision.getBBox().y);
            collisionBounds.setAttributeNS(null,"width",collision.getBBox().width);
            collisionBounds.setAttributeNS(null,"height",collision.getBBox().height);
            collisionBounds.setAttributeNS(null,"fill","none");
            collisionBounds.setAttributeNS(null,"stroke","none");
        
        collision.appendChild(collisionBounds);
        
        drawCollider(collision)
    }
    render();
}


function drawCollider(collisionObj,collider)
{
    var target = collisionObj.getElementsByTagName("circle")[0].getBBox();
    var points = [];
    
    var remove = collisionObj.getElementsByTagName("g");
    
    if(remove.length > 0)
    {
        collisionObj.removeChild(remove[0])
    }
    
    for (var i = 0; i < precision; i++) 
    {
        xValues = ((target.x + target.width/2)  + collisionObj.getElementsByTagName("circle")[0].r.baseVal.value * Math.cos(2 * Math.PI * i / precision));
        yValues = ((target.y + target.height/2) + collisionObj.getElementsByTagName("circle")[0].r.baseVal.value * Math.sin(2 * Math.PI * i / precision));
        
        points.push({x:xValues,y:yValues})
    }
    
    if(collider)
    {
       var colliderTarget = collider.getElementsByTagName("circle")[0].getBBox();
        var colliderPoints = [];
        
        for (var i = 0; i < precision; i++) 
        {
        xValues = ((collider.dx+colliderTarget.x + colliderTarget.width/2)  + collider.getElementsByTagName("circle")[0].r.baseVal.value * Math.cos(2 * Math.PI * i / precision));
        yValues = ((collider.dy+colliderTarget.y + colliderTarget.height/2) + collider.getElementsByTagName("circle")[0].r.baseVal.value * Math.sin(2 * Math.PI * i / precision));
        
        colliderPoints.push({x:xValues,y:yValues})
        }
    } 
    
    var debug = document.createElementNS("http://www.w3.org/2000/svg","g");
    
     for (var i=0;i<=points.length-1;i++)
    { 
        
         var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        
        
        if(collider)
        {
          if(isPointInPoly(colliderPoints,points[i]))
          {
              line.setAttribute('style', "stroke: red");
          }
            else
            {
                line.setAttribute('style', "stroke: #00d000");
                line.setAttributeNS(null,"stroke-opacity","0.5");   
            }
        }
        else
            {
                line.setAttribute('style', "stroke: #00d000");
                line.setAttributeNS(null,"stroke-opacity","0.5");   //FILLCOLOR
            }
        
            line.setAttributeNS(null,"stroke-width",2);  //OUTLINE COLOR
	        line.setAttribute('x1', points[i].x);
	        line.setAttribute('y1', points[i].y);
        
        if(i==points.length-1)
        {
            line.setAttribute('x2', points[0].x);
	       line.setAttribute('y2', points[0].y);
        }
        else
        {
            line.setAttribute('x2', points[i+1].x);
	       line.setAttribute('y2', points[i+1].y);
        }
//	
	   debug.appendChild(line);//ADD LINES TO GROUP
    
    }
   collisionObj.appendChild(debug);//ADD GROUP TO SCENE
}

function intersectRect(r1, r2) {
    var r1 = r1.getBoundingClientRect();    //BOUNDINGBOX_1
    var r2 = r2.getBoundingClientRect();    //BOUNDINGBOX_2
    
  return !(r2.left > r1.right || 
           r2.right < r1.left || 
           r2.top > r1.bottom ||
           r2.bottom < r1.top);
}

function isPointInPoly(poly, pt){
    for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
        ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
        && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
        && (c = !c);
    return c;
}

function render()
{
//    collider.cx.baseVal.value += collider.dx;
//    collider.cy.baseVal.value += collider.dy;
    
    collider.dx += dx;
    collider.dy += dy;
    collider.setAttribute("transform", "translate("+collider.dx+" "+collider.dy+")");
    
    x = collider.dx + collider.getBBox().x;
    y = collider.dy + collider.getBBox().y;
    
    if( x<0 || x>window.innerWidth-100) dx =-dx; 
    if( y<0 || y>window.innerHeight-100) dy =-dy; 
    
    for (var i=0;i<collisionGroup.length;i++)
        {
            if(intersectRect(collider,collisionGroup[i]))
            {
                drawCollider(collisionGroup[i],collider)
            }
        }
    
    requestAnimationFrame( render );//KEEP ANIMATING
}