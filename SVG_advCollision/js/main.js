var collider; //THE MAIN COLLIDER OBJECT WHICH COLLIDE WITH THE COLLISION GROUP
var collisionGroup= []; //ARRAY OF OBJECT WICH CAN COLLIDE WITH THE COLLIDER
var precision = 10; //PRECISION IN PERCENTAGE


function init()
{
    var svg = document.getElementById("SVG_scene"); //GET MAIN SVG ELEMENT
    var svgNS = "http://www.w3.org/2000/svg";   //DEFINE THE namespaceURI
    
    var w = window.innerWidth;
    var h = window.innerHeight;
    
    //CREATE COLLISION GROUP
    for (var i=0;i<3;i++)
    { 
        var collision = document.createElementNS(svgNS,"g") //CREATE A GROUP OF COLLISION OBJECTS
        var collisionObj = document.createElementNS(svgNS,"circle"); //CREATE BASIC SVG ELEMENT(RECT, CIRCLE, ELLIPSE, LINE, POLYLINE, POLYGON)
            collisionObj.setAttributeNS(null,"cx",50+((Math.random()*w)-100)); //CENTER OF THE CIRCLE X
            collisionObj.setAttributeNS(null,"cy",50+((Math.random()*h)-50)); //CENTER OF THE CIRCLE Y
            collisionObj.setAttributeNS(null,"r", 20+Math.random()*w/10);   //RADIUS OF THE CIRCLE
            collisionObj.setAttributeNS(null,"fill","#22907f");   //FILL COLOR
            collisionObj.setAttributeNS(null,"stroke","none");  //STROKE COLOR
        
        collision.appendChild(collisionObj); //PUT ELEMENTS INTO THE COLLISION GROUP
        svg.appendChild(collision) //PUT COLLISION GROUP INTO THE SVG SCENE
        collisionGroup.push(collision); //PUT EACH COLLISION OBJECT INTO AN ARRAY FOR LATER ACCESS
        
        //DRAW COLLISION BOUNDS
        var collisionBounds = document.createElementNS(svgNS,"rect"); //CREATE BASIC SVG ELEMENT(RECT, CIRCLE, ELLIPSE, LINE, POLYLINE, POLYGON)
            collisionBounds.setAttributeNS(null,"x",collision.getBBox().x);//SET X POSITION TO THE X POSITION OF THE BOUNDIG BOX FROM THE OBJECT
            collisionBounds.setAttributeNS(null,"y",collision.getBBox().y);//SET Y POSITION TO THE Y POSITION OF THE BOUNDIG BOX FROM THE OBJECT
            collisionBounds.setAttributeNS(null,"width",collision.getBBox().width);//SET WIDTH TO THE WIDTH OF THE BOUNDIG BOX FROM THE OBJECT
            collisionBounds.setAttributeNS(null,"height",collision.getBBox().height);//SET HEIGHT TO THE HEIGHT OF THE BOUNDIG BOX FROM THE OBJECT
            collisionBounds.setAttributeNS(null,"fill","none");// FILL COLOR
        
        collision.appendChild(collisionBounds);
        
        drawDebug(collision)
    }
    
        collider = document.createElementNS(svgNS,"g")
        
    //CREATE COLLIDER    
    var colliderObj = document.createElementNS(svgNS,"circle"); //CREATE BASIC SVG ELEMENT(RECT, CIRCLE, ELLIPSE, LINE, POLYLINE, POLYGON)
        colliderObj.setAttributeNS(null,"id","collider"); //SET ID
        colliderObj.setAttributeNS(null,"cx",w/2); //CENTER OF THE CIRCLE X
        colliderObj.setAttributeNS(null,"cy",h/2); //CENTER OF THE CIRCLE Y
        colliderObj.setAttributeNS(null,"r",75);   //RADIUS OF THE CIRCLE
        colliderObj.setAttributeNS(null,"fill","white");   //FILL COLOR
        colliderObj.setAttributeNS(null,"fill-opacity","0.5");   //OPACITY
        colliderObj.setAttributeNS(null,"stroke","none");  //STROKE COLOR
    
 
        collider.appendChild(colliderObj); //ADD CIRCLE TO THE MAIN SVG ELEMENT
        
        svg.appendChild(collider); //ADD COLLIDER TO THE MAIN SVG ELEMENT
    
       var colliderBounds = document.createElementNS(svgNS,"rect");
        colliderBounds.setAttributeNS(null,"x",collider.getBBox().x);//SET X POSITION TO THE X POSITION OF THE BOUNDIG BOX FROM THE OBJECT
        colliderBounds.setAttributeNS(null,"y",collider.getBBox().y);//SET Y POSITION TO THE Y POSITION OF THE BOUNDIG BOX FROM THE OBJECT
        colliderBounds.setAttributeNS(null,"width",collider.getBBox().width);//SET WIDTH TO THE WIDTH OF THE BOUNDIG BOX FROM THE OBJECT
        colliderBounds.setAttributeNS(null,"height",collider.getBBox().height);//SET HEIGHT TO THE HEIGHT OF THE BOUNDIG BOX FROM THE OBJECT
        colliderBounds.setAttributeNS(null,"fill","none"); //FILL COLOR
        collider.appendChild(colliderBounds); //ADD CIRCLE TO THE MAIN SVG ELEMENT
    
        collider.transformX = 0; //CURRENT X TRANSFORMATION
        collider.transformY = 0; //CURRENT Y TRANSFORMATION
    
        collider.onmousedown = move; //ON MOUSE DOWN EVENT
        
        drawDebug(collider);
    
    
}

function sliderChange(e)
{
    precision = e.target.value;
    document.getElementById("precision").innerHTML = e.target.value;
    drawDebug(collider)
    drawDebug(collisionGroup[0])
    drawDebug(collisionGroup[1])
    drawDebug(collisionGroup[2])
}

function drawDebug(object,collidingObj)
{
    
    var target = object.getElementsByTagName("circle")[0].getBBox(); //GET BOUNDING BOX OF TARGET OBJECT
    var remove = object.getElementsByTagName("g"); //GET DEBUG LINES GROUP
    
    var points = []; //POINTS ARRAY
    
    //REMOVE DEBUG LINES
    if(remove.length > 0)
    {
        object.removeChild(remove[0])
    }
     
    //CALCULATE OUTLINE POINTS OF A CIRCLE OR A PATH
    for (var i = 0; i < precision; i++) 
    {
        xValues = ((target.x + target.width/2)  + object.getElementsByTagName("circle")[0].r.baseVal.value * Math.cos(2 * Math.PI * i / precision));
        yValues = ((target.y + target.height/2) + object.getElementsByTagName("circle")[0].r.baseVal.value * Math.sin(2 * Math.PI * i / precision));
        
        //PUSH POINTS TO THE ARRAY
        points.push({x:xValues,y:yValues})
    }
    
    //IF THERE IS SOMETHING TO COLLIDE WITH
    if(collidingObj)
    {
        var colliderTarget = collidingObj.getElementsByTagName("circle")[0].getBBox(); //GET BOUNDING BOX OF THE OBJECT
        var colliderPoints = []; //POINTS ARRAY
        
        //REMOVE CURRENT DEBUG LINES ON THE OBJECT
        if(collider.getElementsByTagName("g").length > 0)
        {
            collider.removeChild(collider.getElementsByTagName("g")[0])
        };
        
        //CREATE GROUP FOR DEBUG LINES
        var debug_c = document.createElementNS("http://www.w3.org/2000/svg","g");
        
        //CALCULATE OUTLINE POINTS OF A CIRCLE OR A PATH
        for (var i = 0; i < precision; i++) 
        {
            xValues_c =((colliderTarget.x+collider.transformX+colliderTarget.width/2)  + 75 * Math.cos(2 * Math.PI * i / precision));
            yValues_c =((colliderTarget.y+collider.transformY+colliderTarget.height/2) + 75 * Math.sin(2 * Math.PI * i / precision));
        
            colliderPoints.push({x:xValues_c,y:yValues_c})
        }
        
        //DRAW DEBUG LINES FOR THE COLLIDER
        for (var i=0;i<=colliderPoints.length-1;i++)
        { 
            var line_c = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line_c.setAttribute('style', "stroke: #7f806c");//STROKE COLOR
            
            //DRAW RED LINE IF THE POINT OF THE LINE COLLIDES WITH SOMETHING
            if(isPointInPoly(points,colliderPoints[i]))
            {
                line_c.setAttribute('style', "stroke: red");  //STROKE COLOR
            }
            else
            {
            //OR DRAW GREEN LINE IF NOT COLLIDING    
                
                line_c.setAttribute('style', "stroke: #7f806c"); //STROKE COLOR
            };
            
                line_c.setAttribute('x1', colliderPoints[i].x-collider.transformX);
	            line_c.setAttribute('y1', colliderPoints[i].y-collider.transformY);
            
            if(i==colliderPoints.length-1)
            {
                line_c.setAttribute('x2', colliderPoints[0].x-collider.transformX);
	            line_c.setAttribute('y2', colliderPoints[0].y-collider.transformY);
            }
            else
            {
                line_c.setAttribute('x2', colliderPoints[i+1].x-collider.transformX);
	            line_c.setAttribute('y2', colliderPoints[i+1].y-collider.transformY);
            }
            
            debug_c.appendChild(line_c)//ADD LINES TO GROUP
        }
        collider.appendChild(debug_c)//ADD GROUP TO SCENE
        
    } 
    
    //CREATE GROUP FOR DEBUG LINES
    var debug = document.createElementNS("http://www.w3.org/2000/svg","g");
    
    for (var i=0;i<=points.length-1;i++)
    { 
        
        var line = document.createElementNS("http://www.w3.org/2000/svg", "line");//CREATE LINE OBJECT
            line.setAttribute('style', "stroke: #7f806c");//SET LINE COLOR
        
            //DRAW RED LINE IF THE POINT OF THE LINE COLLIDES WITH SOMETHING
            if(collidingObj) 
            {
                if(isPointInPoly(colliderPoints,points[i]))
                {
                    line.setAttribute('style', "stroke: red");
                }
                else
                {
                    //OR DRAW GREEN LINE IF NOT COLLIDING
                    line.setAttribute('style', "stroke: #7f806c");
                }
            }
          
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
        
        debug.appendChild(line);//ADD LINES TO GROUP
    };
    
    object.appendChild(debug);//ADD GROUP TO SCENE
}

// WHILE MOUSE DOWN. MOVE OBJECT AND CHECK FOR COLLISION
function move(e)
{
    //RESET OFFSET VALUE FROM MOUSE CLICK TO OBJECT FOR TRANSFORM
    var offsetX = e.pageX;
    var offsetY = e.pageY;
    
        offsetX = offsetX-(collider.getBBox().x+ collider.transformX)
        offsetY = offsetY-(collider.getBBox().y+ collider.transformY)
    
    document.onmousemove = function(e) 
    {
        
        //GET TRANSFORM VALUE
        collider.transformX = e.pageX-collider.getBBox().x-(offsetX);
        collider.transformY = e.pageY-collider.getBBox().y-(offsetY);
        
        //TRANSFORM BY AMOUNT OF MOUSE MOVE
        collider.setAttribute("transform", "translate("+collider.transformX+" "+ collider.transformY+")");
         
        
        //CHECK FOR EACH OBJECT IN THE COLLISION GROUP
        for (var i=0;i<collisionGroup.length;i++)
        {
            //IF COLLISION OCCURS
            if(intersectRect(collider,collisionGroup[i]))
            {
                drawDebug(collisionGroup[i],collider)
            }
            //IF THERE IS NO COLLISION ON THE CURRENT OBJECT
            if(!intersectRect(collider,collisionGroup[i]))
            {
            }
        }
    }
    
       document.onmouseup = function() {
        document.onmousemove = null
    }
       
}

function intersectRect(r1, r2) {
    var r1 = r1.getBoundingClientRect();    //BOUNDING BOX OF THE FIRST OBJECT
    var r2 = r2.getBoundingClientRect();    //BOUNDING BOX OF THE SECOND OBJECT
    
    //CHECK IF THE TWO BOUNDING BOXES OVERLAP
  return !(r2.left > r1.right || 
           r2.right < r1.left || 
           r2.top > r1.bottom ||
           r2.bottom < r1.top);
};

function isPointInPoly(poly, pt){
    for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
        ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
        && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
        && (c = !c);
    return c;
}

