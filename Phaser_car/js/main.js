
var game;
var w;
var h;
var cursor;

function init()
{
    w = window.innerWidth;
h = window.innerHeight;
    
game = new Phaser.Game(w, h, Phaser.AUTO, '', { preload: preload, create: create, update: update });
}

function preload() 
{
     initPhaserP2_debug();
}

function create() 
{
    
    // adding P2 physics to the game
    game.physics.startSystem(Phaser.Physics.P2JS);
    // setting gravity
    game.physics.p2.gravity.y = 250;
    
    game.physics.p2.restitution = 0.4;
    
    game.stage.backgroundColor = '#DDDDDD';
    
    // setting gravity
    game.physics.p2.gravity.y = 250;
    game.physics.p2.friction= 5;
    
    cursors = game.input.keyboard.createCursorKeys();
    
    drag();
    initCar();
    initLevel();
}

function update() 
{
    updatePhaserP2_debug();
    
    updateCar();
    updateJump();
}

//PHASER P2 DEBUG 
//#VERSION 0.1

var line;
var springsArray  = [];
var constraintsArray = [];
var target;
var mousePointer;
var mouseConstraint;

function initPhaserP2_debug()
{
   game.load.crossOrigin = true;
    game.load.image('pixel', 'http://i.imgur.com/AwfibOk.png');
    game.load.image('spring', 'http://i.imgur.com/GiqTEwo.png');
    
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
        
        
        
        var point_A = game.add.sprite((P2_object.localAnchorA[0]*20)*-1, (P2_object.localAnchorA[1]*20)*-1); //DUMMY
        var point_B = game.add.sprite((P2_object.localAnchorB[0]*20)*-1, (P2_object.localAnchorB[1]*20)*-1); //DUMMY
        
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

var CG_car;

function initCar()
{
    addCar();
}

function addCar()
{
    carBody = game.add.sprite(100, 100);; //CARBODY
    wheel_front = game.add.sprite(140, 130); //FRONT WHEEL
    wheel_back = game.add.sprite(60, 130);; //BACK WHEEL 
    CG_car = game.physics.p2.createCollisionGroup(); //CAR GROUP
    
    game.physics.p2.updateBoundsCollisionGroup(); //UPDATE COLLISION BOUND FOR GROUPS
    
    game.physics.p2.enable([wheel_front, wheel_back,carBody]);

        carBody.body.setRectangle(100,30);
        carBody.body.debug = true;
        carBody.body.mass = 1;
        carBody.body.setCollisionGroup(CG_car);
    
    
        wheel_front.body.setCircle(20);
        wheel_front.body.debug = true;
        wheel_front.body.mass = 1;
        wheel_front.body.setCollisionGroup(CG_car);
    
        wheel_back.body.setCircle(20);
        wheel_back.body.debug = true;
        wheel_back.body.mass = 1;
        wheel_back.body.setCollisionGroup(CG_car);
    
//        //Spring(world, bodyA, bodyB, restLength, stiffness, damping, worldA, worldB, localA, localB)
    var spring = game.physics.p2.createSpring(carBody,wheel_front, 70, 150, 50,null,null,[30,0],null);
        addPhaserP2_debug(spring,"spring")
    var spring_1 = game.physics.p2.createSpring(carBody,wheel_back, 70, 150,50,null,null,[-30,0],null);
        addPhaserP2_debug(spring_1,"spring")
        
    var constraint = game.physics.p2.createPrismaticConstraint(carBody,wheel_front, false,[30,0],[0,0],[0,1]);
        addPhaserP2_debug(constraint,"prismaticConstraint")
        constraint.lowerLimitEnabled=constraint.upperLimitEnabled = true;
        constraint.upperLimit = -1;
        constraint.lowerLimit = -8;    
    var constraint_1 = game.physics.p2.createPrismaticConstraint(carBody,wheel_back, false,[-30,0],[0,0],[0,1]);
        addPhaserP2_debug(constraint_1,"prismaticConstraint")
        constraint_1.lowerLimitEnabled=constraint_1.upperLimitEnabled = true;
        constraint_1.upperLimit = -1;
        constraint_1.lowerLimit = -8;    
}

function updateCar()
{
    game.physics.p2.walls.bottom.velocity[0] = wheel_back.body.angularVelocity+(carBody.position.x-(w/2-w/4+100))/1000;
    
    if (cursors.left.isDown)
    {
        wheel_back.body.angularVelocity = -40;
        wheel_front.body.angularVelocity = -40;
        
        game.physics.p2.walls.bottom.velocity[0] = wheel_back.body.angularVelocity+(carBody.position.x-(w/2-w/4+100))/50;
    }
    
    if (cursors.right.isDown)
    {
        wheel_back.body.angularVelocity = +40;
        wheel_front.body.angularVelocity = +40;
        
        game.physics.p2.walls.bottom.velocity[0] = wheel_back.body.angularVelocity+(carBody.position.x-(w/2-w/4))/50;
    }
    
}

var groundGroup;
var CG_level;
var jump;

function initLevel()
{
    groundGroup = game.add.group();
    
    addJump();
}

function addJump()
{
    var groundSegment = [[500,h],[700,h],[700,h-50]]
    
    CG_level = game.physics.p2.createCollisionGroup(); //CAR GROUP
    
    game.physics.p2.updateBoundsCollisionGroup(); //UPDATE COLLISION BOUND FOR GROUPS
    
    jump = groundGroup.create(0,0);
    jump.anchor.setTo(0.5, 0.5)
    game.physics.p2.enable(jump,true, true);
    
    jump.body.clearShapes();
    jump.body.mass = 10;
    jump.body.addPolygon({}, groundSegment);
    jump.body.kinematic = true;
    jump.body.setCollisionGroup(CG_level);
    jump.body.fixedRotation = true;
    jump.body.data.gravityScale = 0;
    jump.body.collides(CG_car);
    jump.body.collideWorldBounds = false;
    
    wheel_front.body.collides(CG_level);
    wheel_back.body.collides(CG_level);
    carBody.body.collides(CG_level);
    
    
    
    var spriteMaterial = game.physics.p2.createMaterial('spriteMaterial', wheel_front.body);
        wheel_back.body.setMaterial(spriteMaterial)
        
    var worldMaterial = game.physics.p2.createMaterial('worldMaterial',jump.body);

    var contactMaterial = game.physics.p2.createContactMaterial(spriteMaterial, worldMaterial);

    contactMaterial.friction = 0.5;     // Friction to use in the contact of these two materials.

}

function updateJump()
{
    jump.body.velocity.y = 0;  
    jump.body.velocity.x = wheel_back.body.angularVelocity*-10;
    
    if(jump.position.x < -200)
    {
        jump.body.reset(w+200,(h-(Math.random()*40-20)))
    }
}

