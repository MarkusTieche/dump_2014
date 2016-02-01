var game;
var w;
var h;

function init()
{
      w = document.body.offsetWidth;
     h = document.body.offsetHeight;
    
    game = new Phaser.Game(w, h, Phaser.AUTO, '', { preload: preload, create: create, update: update });
    
    initGUI();
}    
    

function preload() 
{
     game.load.crossOrigin = true;
    game.load.image('pixel', 'http://i.imgur.com/AwfibOk.png');
    game.load.image('spring', 'http://i.imgur.com/GiqTEwo.png');
}

function create() 
{
    initPhaserP2_debug();
    
    // adding P2 physics to the game
    game.physics.startSystem(Phaser.Physics.P2JS);
    // setting gravity
    game.physics.p2.gravity.y = 250;
    
    game.physics.p2.restitution = 0.4;
    
    game.stage.backgroundColor = '#DDDDDD';
    
    // setting gravity
    game.physics.p2.gravity.y = 250;
    game.physics.p2.friction= 5;
    
    drag();
    
    initWheel();
    updateSlide();
}

                
function update() 
{
    updatePhaserP2_debug();
}


var line;
var springsArray  = [];
var constraintsArray = [];
var target;
var mousePointer;
var mouseConstraint;

function initPhaserP2_debug()
{
   
   // game.load.image('point', 'assets/point.png');
    
    line = new Phaser.Line(0, 0, 200, 200);
    
    //DRAG
    game.input.onDown.add(click, this);
    game.input.onUp.add(stopDrag, this);
}

function drag()
{
    //MOUSE TARGET
    mousePointer = game.add.sprite(200, 200);
    game.physics.p2.enable(mousePointer);
    mousePointer.body.setCircle(5);
    mousePointer.body.debug = false;
    mousePointer.body.mass = 0.01;
    mousePointer.body.kinematic = true;
}

function click(pointer) {

	var bodies = game.physics.p2.hitTest(pointer.position);

	if (bodies.length != 0)
	{
		target = bodies[0];
        mouseConstraint = game.physics.p2.createRevoluteConstraint(mousePointer, [0,0],target, [ 0, 0 ],100);
	}
}

function stopDrag(pointer) 
{
    target = null;
    game.physics.p2.removeConstraint(mouseConstraint) 
}




function addPhaserP2_debug(P2_object,type)
{
    if(type == "spring")
    {
        var springSprite = game.add.tileSprite(0, 0, 24, (P2_object.restLength * 20), 'spring');
            springSprite.anchor.setTo(0.5, 0);
            springSprite.rest = 0;
        
        var point_A = game.add.sprite((P2_object.localAnchorA[0]*20), (P2_object.localAnchorA[1]*20)); //DUMMY
        var point_B = game.add.sprite((P2_object.localAnchorB[0]*20), (P2_object.localAnchorB[1]*20)); //DUMMY
        
            P2_object.bodyA.parent.sprite.addChild(point_A)
            P2_object.bodyB.parent.sprite.addChild(point_B)

            game.physics.p2.enable([point_A,point_B]);

            point_A.body.static = true;
            point_B.body.static = true;
            springsArray.push([P2_object,springSprite,point_A,point_B]);
    }
    
    if(type == "prismaticConstraint")
    {
        var constraintSprite = game.add.sprite(0, 0, 'pixel');
        
        
        var point_A = game.add.sprite(0, 0); //DUMMY
        var point_B = game.add.sprite(0, 0); //DUMMY
        
            P2_object.bodyA.parent.sprite.addChild(point_A)
            P2_object.bodyB.parent.sprite.addChild(point_B)

            game.physics.p2.enable([point_A,point_B]);

            point_A.body.static = true;
            point_B.body.static = true;
            constraintsArray.push([P2_object,constraintSprite,point_A,point_B]);
    }
}

function updatePhaserP2_debug()
{
    for (var i = 0; i < springsArray.length; i++) 
    {
        var point_A = {x:springsArray[i][2].world.x, y:springsArray[i][2].world.y};
        var point_B = {x:springsArray[i][3].world.x, y:springsArray[i][3].world.y};
        
        line.setTo(point_A.x,point_A.y,point_B.x,point_B.y);
        
        springsArray[i][1].position.x = line.start.x;
        springsArray[i][1].position.y = line.start.y;
        springsArray[i][1].angle = (line.angle*180 / Math.PI)-90;
        springsArray[i][1].scale.y = line.length/(springsArray[i][0].restLength*20);
    }
    
    for (var i = 0; i < constraintsArray.length; i++) 
    {
        var point_A = {x:constraintsArray[i][2].world.x, y:constraintsArray[i][2].world.y};
        var point_B = {x:constraintsArray[i][3].world.x, y:constraintsArray[i][3].world.y};
        
        line.setTo(point_A.x,point_A.y,point_B.x,point_B.y);
    
        constraintsArray[i][1].position.x = line.start.x;
        constraintsArray[i][1].position.y = line.start.y;
        constraintsArray[i][1].angle = (line.angle*180 / Math.PI);
        constraintsArray[i][1].scale.x = line.length; 
        
    }
    
    if(target)
    {
        mousePointer.body.velocity.x = (game.input.activePointer.x - mousePointer.position.x)*20;
        mousePointer.body.velocity.y = (game.input.activePointer.y - mousePointer.position.y)*20;
    }
    else
    {
        mousePointer.body.velocity.x = 0;
        mousePointer.body.velocity.y = 0;
    }
}

var CG_wheel;
var spring;
var constraint;
var wheel;
var base;

function initWheel()
{
    addWheel();
}

function addWheel()
{
    
    CG_wheel = game.physics.p2.createCollisionGroup(); //COLLISION GROUP
    
     game.physics.p2.updateBoundsCollisionGroup(); //UPDATE COLLISION BOUND FOR GROUPS
    
        base = game.add.sprite(w/2, 100);
        game.physics.p2.enable(base,true, true);
        base.body.setRectangle(150,50);
        base.body.static = true;
        base.body.setCollisionGroup(CG_wheel);
    
        wheel = game.add.sprite(w/2, 200); //FRONT WHEEL
        game.physics.p2.enable(wheel,true, true);
        wheel.body.setCircle(40);
        wheel.body.mass = 1;
        wheel.body.setCollisionGroup(CG_wheel);
        
    
        //Spring(world, bodyA, bodyB, restLength, stiffness, damping, worldA, worldB, localA, localB)
        spring = game.physics.p2.createSpring(base,wheel, 100, 10, 1,null,null,[0,0],null);
        addPhaserP2_debug(spring,"spring")
        
        //PrismaticConstraint(world, bodyA, bodyB, lockRotation, anchorA, anchorB, axis, maxForce)
        constraint = game.physics.p2.createPrismaticConstraint(base,wheel, false,[0,0],[0,0],[0,1]);
        addPhaserP2_debug(constraint,"prismaticConstraint")
        constraint.lowerLimitEnabled=constraint.upperLimitEnabled = true;
        constraint.upperLimit = -0.1;
        constraint.lowerLimit = -10;    
}

function updateWheel()
{
}

function initGUI()
{
    document.getElementById("btn_menu").onclick = function(event)
    {
        if(document.getElementById("options").classList.contains("open"))
        {
            document.getElementById("options").classList.remove("open");
        }
        else
        {
            document.getElementById("options").classList.add("open");
        }
    }
}

function check(e)
{
	if(constraint.localAxisA[1] == 1)
	{
		constraint.localAxisA[1] = 0;
	}
	else
	{
		constraint.localAxisA[1] = 1;
	}
}

function slide(e)
{
    e.target.previousElementSibling.innerHTML = e.target.id+":   "+e.target.value;
    
    updateSlide();
}

function updateSlide()
{
    
    wheel.body.mass = Number(document.getElementById("weight").value);
    
    constraint.upperLimit =Number(document.getElementById("upper limit").value);
    constraint.lowerLimit = Number(document.getElementById("lower limit").value);
    
    
    spring.damping = Number(document.getElementById("damping").value);
    spring.stiffness = Number(document.getElementById("stiffness").value);
    
    line_UpperLimit  = new Phaser.Line(base.position.x-50, (base.position.y-(constraint.upperLimit*20)), base.position.x+50, (base.position.y-(constraint.upperLimit*20)));
    line_LowerLimit = new Phaser.Line(base.position.x-50, (base.position.y-(constraint.lowerLimit*20)), base.position.x+50, (base.position.y-(constraint.lowerLimit*20)));
    game.debug.geom(line_UpperLimit,"red");
    game.debug.geom(line_LowerLimit,"red");
    
}
