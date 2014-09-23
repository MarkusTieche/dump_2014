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


var svg;
var lines = [];
var noise;
var dead = 0;
var last;
var iret = 0;
var h;

function init(){

    noise = new smoothNoise(); //INIT NOISE
    noise.width = noise.width+400;
    noise.lastPos.x = 0;
    
     h =  (window.innerHeight/2)-400; //CENTERS THE LINE
    
    svg = document.getElementById("SVG_scene"); //GET MAIN SVG ELEMENT
    var svgNS = "http://www.w3.org/2000/svg";   //DEFINE THE namespaceURI
    
    //ADD DUMMY FOR ADDITIONAL POINT
     var line = document.createElementNS(svgNS,"line"); 
                line.setAttributeNS(null,"x1",0);
                line.setAttributeNS(null,"y1",0);
                line.setAttributeNS(null,"x2",0);
                line.setAttributeNS(null,"y2",0);
                line.setAttributeNS(null,"stroke","#333");
                line.setAttributeNS(null,"stroke-width","3");
                line.pos = {x:0,y:0}
                line.dead = false;
                last = line;
            
            svg.appendChild(line); //ADD CIRCLE TO THE MAIN SVG ELEMENT
            lines.push(line)
    
    
    for (var j = 0; j < 1; j++) 
    {
        var fill = noise.fill(); //FILL WITH NOISE -> RETURNS ARRAY WITH EACH POINTS X AND Y POS
        for (var i = 0; i < fill.length-1; i++) 
        {
            var line = document.createElementNS(svgNS,"line"); 
                line.setAttributeNS(null,"x1",fill[i].x);
                line.setAttributeNS(null,"y1",fill[i].y+h);
                line.setAttributeNS(null,"x2",fill[i+1].x);
                line.setAttributeNS(null,"y2",fill[i+1].y+h);
                line.setAttributeNS(null,"stroke","#333");
                line.setAttributeNS(null,"stroke-width","3");
                line.pos = {x:0,y:fill[i+1].y+h}
                line.dead = false;
                last = line;
            
            svg.appendChild(line); //ADD CIRCLE TO THE MAIN SVG ELEMENT
            lines.push(line)
        }
        
    
    }
    
    
    update();
}

function update(time)
{
    for (var i = 0; i < lines.length; i++) { 
        
        
        if((Number(lines[i].getAttribute("x2"))+lines[i].pos.x) <= 0)
        {
            if(!lines[i].dead)
            {
                dead += 1;
                lines[i].dead = true;
            }
        }
        else
        {
            lines[i].pos.x -= 2;
            lines[i].setAttribute("transform", "translate("+ lines[i].pos.x+" "+0+")");
        }
        
    }
    
    if(dead >= noise.subDivision)
    {
        
        dead = 0;
        
        noise.lastPos.x = last.getBoundingClientRect().right;
        noise.lastPos.y = last.pos.y-h;
        
//        console.log(last.getBoundingClientRect().left)
        var newPos = noise.add();
        var posX = last.getBoundingClientRect().right;
        
        
        for (var i = 0; i < newPos.length; i++) 
        {   
//            console.log("iret"+(i+iret))
            
            if((i+iret) >= lines.length)
            {
                iret = 0;
            }
            lines[i+iret].setAttributeNS(null,"x1",posX);
            lines[i+iret].setAttributeNS(null,"y1",last.pos.y);
            lines[i+iret].setAttributeNS(null,"x2",newPos[i].x);
            lines[i+iret].setAttributeNS(null,"y2",newPos[i].y+h);
            lines[i+iret].pos = {x:0,y:(newPos[i].y+h)}
            last = lines[i+iret];
            posX = newPos[i].x;
            lines[i+iret].dead = false;
            
            
            
        }
        
        
        iret += noise.subDivision
    }
    
    requestAnimationFrame(update);  
}