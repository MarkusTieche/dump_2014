var startWidth;

function init()
{
    startWidth = document.getElementById("wrapper").offsetWidth;
}

function changeFontSize()
{
    //GET THE TEXT CONTAINER
    var wrapper = document.getElementById("wrapper");
    
    //ADD ELEMENTS THAT SCALE WHIT PARENT
    var children = [wrapper.getElementsByTagName('h1'),wrapper.getElementsByTagName('h2'),wrapper.getElementsByTagName('h3')];
    
    //SET THE SCALE FACTOR
    factor = wrapper.clientWidth / startWidth;
    
    //LOOP TROUGH EVERY ELEMENT 
    for (var i=0;i<children.length;i++)
    {   
        for (var j=0;j<children[i].length;j++)
        { 
            //SET THE BASIC CSS VALUE
            children[i][j].style.fontSize = null;
            //GET ORIGINAL FONT-SIZE OF THE ELEMENT
            fontSize = parseInt( window.getComputedStyle( children[i][j], null ).getPropertyValue( 'font-size' ).replace('px','') ,10);
            
            //GET THE NEW FONT-SIZE
            fontSize = fontSize * factor;
            fontSize = fontSize.toFixed(2);
            
            //APPLY FONT-SIZE
            children[i][j].style.fontSize = fontSize +"px";
            
        };
    };
}

function mouseUp(event)
{
 changeFontSize()
}