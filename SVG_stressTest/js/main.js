var width;
var height;
var onScreen = 0;
var renderT = "svg";

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

function renderType(event)
{
    renderT = event.target.value;
    
    var myNode = document.getElementById("svg");
while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
}
     onScreen = 0;
     document.getElementById("onScreen").innerHTML = "Squares on screen: "+onScreen;
}

function addHundert()
{
    for (var i=0;i<100;i++)
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
    
//    alert(renderType)
    if(renderT == "svg")
    {
    
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
    }
    
    if(renderT == "css")
    {
       square.setAttributeNS(null,"class","square");
        
        square.style.MozTransformOrigin = (posX+50) + "px " + (posY+50)+"px";
        square.style.WebkitTransformOrigin = (posX+50) + " "+ (posY+50);
    }
    
    document.getElementById("svg").appendChild(square);
    
    onScreen++;

     document.getElementById("onScreen").innerHTML = "Squares on screen: "+onScreen;
}