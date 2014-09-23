function init()
{
    var w = Math.round(window.innerWidth);
    var h = window.innerHeight;
    
    document.getElementById("rect_1").setAttributeNS(null,"width",400); 
    document.getElementById("rect_1").setAttributeNS(null,"height",100); 
    document.getElementById("rect_1").setAttributeNS(null,"x",w/2-200); 
    document.getElementById("rect_1").setAttributeNS(null,"y",h/2-50); 
    
    document.getElementById("group_1").setAttribute("transform", "translate("+(w/2 - 200 + 400/100 * 10-10)+" "+(h/2-75)+")");
    document.getElementById("line_1").onmousedown = move; //ON MOUSE DOWN EVENT
    
    document.getElementById("group_2").setAttribute("transform", "translate("+(w/2 - 200 + 400/100 * 30-10)+" "+(h/2-75)+")");
    document.getElementById("line_2").onmousedown = move; //ON MOUSE DOWN EVENT
    
    document.getElementById("group_3").setAttribute("transform", "translate("+(w/2 - 200 + 400/100 * 70-10)+" "+(h/2-75)+")");
    document.getElementById("line_3").onmousedown = move; //ON MOUSE DOWN EVENT

}

function move(e)
{ 
    var offsetX = e.pageX;
    var offsetY = e.pageY;
    
    var target = e.target;
    var h = window.innerHeight;
    
    var num = e.target.id.replace("line_","stop_");
    var text = e.target.id.replace("line_","percent_");
    document.onmousemove = function(e) 
    {
        
        var percent = e.pageX - window.innerWidth/2+200;
        if(e.pageX > window.innerWidth/2 - 200 && e.pageX < window.innerWidth/2 + 200){
            
            target.parentNode.setAttribute("transform", "translate("+(e.pageX-10)+" "+(h/2-75)+")");
        
        document.getElementById(num).setAttributeNS(null,"offset",(percent/400)); 
        document.getElementById(text).textContent = Math.round((percent/400) * 100)+"%";
        }
    }
    
    document.onmouseup = function() 
    {
        document.onmousemove = null
    }
}