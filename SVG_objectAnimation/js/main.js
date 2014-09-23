function init()
{
    var svg = document.getElementById("SVG_scene"); //GET MAIN SVG ELEMENT
    var svgNS = "http://www.w3.org/2000/svg";   //DEFINE THE namespaceURI
    
    var w = window.innerWidth;
    var h = window.innerHeight;
 
    var square = document.createElementNS(svgNS,"rect");
        square.setAttributeNS(null,"id","Square"); //ID OF THE CIRCLE, OBJECT CAN BE MODIFIED VIA CSS
        square.setAttributeNS(null,"x",w/2-50);
        square.setAttributeNS(null,"y",h/2-50);
        square.setAttributeNS(null,"width",100);
        square.setAttributeNS(null,"height",100);
        square.setAttributeNS(null,"fill","#F05011");
        square.setAttributeNS(null,"stroke","none");
 
        svg.appendChild(square); //ADD CIRCLE TO THE MAIN SVG ELEMENT
    
    
    var pivot = document.createElementNS(svgNS,"circle"); //CREATE BASIC SVG ELEMENT(RECT, CIRCLE, ELLIPSE, LINE, POLYLINE, POLYGON)
        pivot.setAttributeNS(null,"id","Circle"); //ID OF THE CIRCLE, OBJECT CAN BE MODIFIED VIA CSS
        pivot.setAttributeNS(null,"class","circle"); //CLASS OF THE CIRCLE, OBJECT CAN BE MODIFIED VIA CSS
        pivot.setAttributeNS(null,"cx",w/2); //CENTER OF THE CIRCLE X
        pivot.setAttributeNS(null,"cy",h/2); //CENTER OF THE CIRCLE Y
        pivot.setAttributeNS(null,"r",10);   //RADIUS OF THE CIRCLE
        pivot.setAttributeNS(null,"fill","black");   //FILLCOLOR
        pivot.setAttributeNS(null,"stroke","none");  //OUTLINE COLOR
        pivot.onmousedown = movePivot;
 
        svg.appendChild(pivot); //ADD CIRCLE TO THE MAIN SVG ELEMENT
    
    var ani = document.createElementNS("http://www.w3.org/2000/svg","animateTransform");
        ani.setAttributeNS(null,"id","Ani"); //ID OF THE CIRCLE, OBJECT CAN BE MODIFIED VIA CSS
        ani.setAttribute("attributeName", "transform");
        ani.setAttribute("attributeType", "xml");
        ani.setAttribute("type", "rotate" );
        ani.setAttribute("from", "0"+" "+(pivot.cx.baseVal.value)+" "+(pivot.cy.baseVal.value));
        ani.setAttribute("to", "360"+" "+(pivot.cx.baseVal.value)+" "+(pivot.cy.baseVal.value));
        ani.setAttribute("begin", "0s");
        ani.setAttribute("dur", "2s");
        ani.setAttribute("repeatCount", "indefinite");
    
        square.appendChild(ani);
}

function movePivot()
{
    var pivot = document.getElementById("Circle");
    
    document.onmousemove = function(e) 
    {
        pivot.cx.baseVal.value = e.pageX;
        pivot.cy.baseVal.value = e.pageY;
    }
    
    document.onmouseup = function() {
        document.onmousemove = null
        document.getElementById("Ani").setAttribute("from", "0"+" "+(pivot.cx.baseVal.value)+" "+(pivot.cy.baseVal.value));
        document.getElementById("Ani").setAttribute("to", "360"+" "+(pivot.cx.baseVal.value)+" "+(pivot.cy.baseVal.value));
        
    
    }

}