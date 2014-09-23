var width;
var height;

function init()
{
    
    width = document.getElementById('svg_Wrapper').offsetWidth;
    height = document.getElementById('svg_Wrapper').offsetHeight;
//    addSquare();
    for (var i=0;i<10;i++)
    { 
        addSquare()
    }
}

function addSquare()
{
    var svgNS = "http://www.w3.org/2000/svg";
    var posX = Math.floor(Math.random() * width) - 50;
    var posY = Math.floor(Math.random() * height) - 50;
    
    var square = document.createElementNS(svgNS,"rect");
        square.setAttributeNS(null,"x",posX);
        square.setAttributeNS(null,"y",posY);
        square.setAttributeNS(null,"width",100);
        square.setAttributeNS(null,"height",100);
        square.setAttributeNS(null,"fill","#"+((1<<24)*Math.random()|0).toString(16));
        square.setAttributeNS(null,"stroke","none");
    

    
    var ani = document.createElementNS("http://www.w3.org/2000/svg","animateTransform");
        ani.setAttribute("attributeName", "transform");
        ani.setAttribute("attributeType", "xml");
        ani.setAttribute("type", "rotate" );
        ani.setAttribute("from", "0"+" "+(posX+50)+" "+(posY+50));
        ani.setAttribute("to", "360"+" "+(posX+50)+" "+(posY+50));
        ani.setAttribute("begin", "0s");
        ani.setAttribute("dur", "2s");
        ani.setAttribute("repeatCount", "indefinite");
    
    square.appendChild(ani);
  
    
    document.getElementById("svg").appendChild(square);
}