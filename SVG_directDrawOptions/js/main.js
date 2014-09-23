function init()
{
    
    var svgNS = "http://www.w3.org/2000/svg";   //DEFINE THE namespaceURI
var svg = document.getElementById("SVG_scene"); //GET MAIN SVG ELEMENT
    
    var myCircle = document.createElementNS(svgNS,"circle"); //CREATE BASIC SVG ELEMENT(RECT, CIRCLE, ELLIPSE, LINE, POLYLINE, POLYGON)
        myCircle.setAttributeNS(null,"id","svg_Element"); //ID OF THE CIRCLE, OBJECT CAN BE MODIFIED VIA CSS
        myCircle.setAttributeNS(null,"class","circle"); //CLASS OF THE CIRCLE, OBJECT CAN BE MODIFIED VIA CSS
        myCircle.setAttributeNS(null,"cx",100); //CENTER OF THE CIRCLE X
        myCircle.setAttributeNS(null,"cy",100); //CENTER OF THE CIRCLE Y
        myCircle.setAttributeNS(null,"r",50);   //RADIUS OF THE CIRCLE
        myCircle.setAttributeNS(null,"fill","black");   //FILLCOLOR
        myCircle.setAttributeNS(null,"stroke","#00FFD0");  //OUTLINE COLOR
        myCircle.setAttributeNS(null,"stroke-width","2");  //OUTLINE WIDTH

        svg.appendChild(myCircle); //ADD CIRCLE TO THE MAIN SVG ELEMENT
}

function draw(e)
{
    document.getElementById("svg_Element").setAttribute(e.target.id,e.target.value)
}