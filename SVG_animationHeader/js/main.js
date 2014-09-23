var square;
var pivot;
var path;
var length;
var time;
var elapsed = 0;
var duration = 20; 

function init()
{
    var svg = document.getElementById("SVG_scene"); //GET MAIN SVG ELEMENT
    var svgNS = "http://www.w3.org/2000/svg";   //DEFINE THE namespaceURI
    
    var w = window.innerWidth; //WINDOW WIDTH
    var h = window.innerHeight; //WINDOW HEIGHT
    
      path = document.createElementNS(svgNS,"path"); //CREATE NEW PATH
        path.setAttributeNS(null,"id","Path"); //ID OF THE OBJECT, OBJECT CAN BE MODIFIED VIA CSS
        path.setAttributeNS(null,"d","M-10,300 Q200,50 400, 300 T800,300 T1200,300 T1600,300 T2000,300 L2000,"+h+" L-10,"+h+" Z"); //PATH
        path.setAttributeNS(null,"fill","#F05011");   //FILLCOLOR
        path.setAttributeNS(null,"stroke","black");  //OUTLINE COLOR
        path.setAttributeNS(null,"stroke-width","3");  //OUTLINE COLOR
        svg.appendChild(path); //ADD CIRCLE TO THE MAIN SVG ELEMENT
    
        square = document.createElementNS(svgNS,"rect");//CREATE SVG RECT
        square.setAttributeNS(null,"id","Square"); //ID OF THE OBJECT, OBJECT CAN BE MODIFIED VIA CSS
        square.setAttributeNS(null,"x",w/2-50);//CENTER RECT X 
        square.setAttributeNS(null,"y",h/2-50);//CENTER RECT Y
        square.setAttributeNS(null,"width",20);//RECT WIDTH
        square.setAttributeNS(null,"height",20);//RECT HEIGHT
        square.setAttributeNS(null,"fill","black");//SET RANDOM COLOR
        square.setAttributeNS(null,"stroke","none");//NO STROKE
 
        svg.appendChild(square); //ADD CIRCLE TO THE MAIN SVG ELEMENT
   
    length = path.getTotalLength(); //GET TOTAL LENGHT OF THE PATH
    
    animate();
    
//    var oSerializer = new XMLSerializer();
//    var sXML = oSerializer.serializeToString(svg);
//   
//    console.log(sXML)
}

//THIS FUNCTION IS EXECUTED EACH FRAME
function animate() 
{
    //TIMER TO GET POSITION BASED ON TIME
    var now = new Date().getTime(), //GET CURRENT TIME
        dt = now - (time || now); //FRAME TIME
        elapsed += dt/1000; //ELAPSED TIME SINCE ANIMATION START
    var t = elapsed / duration; //RUNNING TIME OF THE FULL ANIMATION
    var percent = t * 100; 
        time = now;
    
    //  angle calculations
    var p0 = path.getPointAtLength( length * percent/100-1 ) //GET POINT BEFORE
    var p1 = path.getPointAtLength( length * percent/100+1 ) //GET POINT AFTER
    var angle = Math.atan2(p1.y-p0.y,p1.x-p0.x)*180 / Math.PI; //GET ANGLE
    
    var pos = path.getPointAtLength( length * percent/100 ); //GET POSITION A CURRENT PERCENTAGE
        square.x.baseVal.value = pos.x -10; //OFFSET X TO CENTER THE CUBE
        square.y.baseVal.value = pos.y-10;  //OFFSET Y TO CENTER THE CUBE
    
    square.setAttribute("transform", "rotate(" + angle + " "+ pos.x+" "+ pos.y+")"); //SET CURRENT ROTATION AND POSITION
    
    if(pos.x > window.innerWidth) //RESET POSITION IF END OF SCREEN IS REACHED
    {
        elapsed = 0;
    };
    
    if( percent > 100 || percent < 0 ) //RESET POSITION IF END OF PATH IS REACHED
    {
        elapsed = 0;
    };
    
    requestAnimationFrame( animate );//KEEP ANIMATING
}