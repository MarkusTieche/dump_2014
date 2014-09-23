function init()
{
    var w = window.innerWidth;
    var h = window.innerHeight;
    
    document.getElementById("rect_1").setAttribute("transform", "translate("+(w/2-16)+" "+(h/2-16)+") scale(2)");
}