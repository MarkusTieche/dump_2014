var player;

function init(event)
{
  player = document.getElementById("player");  
}
function jump(event)
{
	
	player.className = "jump";
	player.addEventListener( "webkitAnimationEnd", run, false );
    player.addEventListener( "animationend", run, false );
};

function roll(event)
{
	player.className = "roll";
	player.addEventListener( "webkitAnimationEnd", run, false );
    player.addEventListener( "animationend",run, false );
};

function run(event)
{
	player.className = "run";
	player.removeEventListener( "webkitAnimationEnd", run, false );
    player.removeEventListener( "animationend", run, false );
};