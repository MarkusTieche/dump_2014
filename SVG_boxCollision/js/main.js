var collider; //THE MAIN COLLIDER OBJECT WHICH COLLIDE WITH THE COLLISION GROUP
var collisionGroup= []; //ARRAY OF OBJECT WICH CAN COLLIDE WITH THE COLLIDER


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
            collisionObj.setAttributeNS(null,"r",50);   //RADIUS OF THE CIRCLE
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
            collisionBounds.setAttributeNS(null,"stroke","#7f806c");//STROKE COLOR
            collisionBounds.setAttributeNS(null,"stroke-width","1");//STRIKE WIDTH
        
        collision.appendChild(collisionBounds);
    }
    
        collider = document.createElementNS(svgNS,"g")
        
    //CREATE COLLIDER    
    var colliderObj = document.createElementNS(svgNS,"circle"); //CREATE BASIC SVG ELEMENT(RECT, CIRCLE, ELLIPSE, LINE, POLYLINE, POLYGON)
        colliderObj.setAttributeNS(null,"id","collider"); //SET ID
        colliderObj.setAttributeNS(null,"cx",w/2); //CENTER OF THE CIRCLE X
        colliderObj.setAttributeNS(null,"cy",h/2); //CENTER OF THE CIRCLE Y
        colliderObj.setAttributeNS(null,"r",75);   //RADIUS OF THE CIRCLE
        colliderObj.setAttributeNS(null,"fill","white");   //FILL COLOR
        colliderObj.setAttributeNS(null,"fill-opacity","0.8");   //OPACITY
        colliderObj.setAttributeNS(null,"stroke","none");  //STROKE COLOR
    
 
        collider.appendChild(colliderObj); //ADD CIRCLE TO THE MAIN SVG ELEMENT
        
        svg.appendChild(collider); //ADD COLLIDER TO THE MAIN SVG ELEMENT
    
       var colliderBounds = document.createElementNS(svgNS,"rect");
        colliderBounds.setAttributeNS(null,"x",collider.getBBox().x);//SET X POSITION TO THE X POSITION OF THE BOUNDIG BOX FROM THE OBJECT
        colliderBounds.setAttributeNS(null,"y",collider.getBBox().y);//SET Y POSITION TO THE Y POSITION OF THE BOUNDIG BOX FROM THE OBJECT
        colliderBounds.setAttributeNS(null,"width",collider.getBBox().width);//SET WIDTH TO THE WIDTH OF THE BOUNDIG BOX FROM THE OBJECT
        colliderBounds.setAttributeNS(null,"height",collider.getBBox().height);//SET HEIGHT TO THE HEIGHT OF THE BOUNDIG BOX FROM THE OBJECT
        colliderBounds.setAttributeNS(null,"fill","none"); //FILL COLOR
        colliderBounds.setAttributeNS(null,"stroke","#7f806c");//STROKE COLOR
        colliderBounds.setAttributeNS(null,"stroke-width","1");//STROKE WIDTH
        collider.appendChild(colliderBounds); //ADD CIRCLE TO THE MAIN SVG ELEMENT
    
        collider.transformX = 0; //CURRENT X TRANSFORMATION
        collider.transformY = 0; //CURRENT Y TRANSFORMATION
    
        collider.onmousedown = move; //ON MOUSE DOWN EVENT
    
    
    
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
         
        //RESET BOUNDING BOX COLOR
        collider.getElementsByTagName("rect")[0].setAttribute("stroke","#7f806c");
        
        //CHECK FOR EACH OBJECT IN THE COLLISION GROUP
        for (var i=0;i<collisionGroup.length;i++)
        {
            //IF COLLISION OCCURS
            if(intersectRect(collider,collisionGroup[i]))
            {
                //CHANGE COLOR OF COLLIDING OBJECTS
                collisionGroup[i].getElementsByTagName("rect")[0].setAttribute("stroke","red");
                collider.getElementsByTagName("rect")[0].setAttribute("stroke","red");
            }
            //IF THERE IS NO COLLISION ON THE CURRENT OBJECT
            if(!intersectRect(collider,collisionGroup[i]))
            {
                //RESET BOUNDING BOX COLOR
                collisionGroup[i].getElementsByTagName("rect")[0].setAttribute("stroke","#7f806c");
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
}
