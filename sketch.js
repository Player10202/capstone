const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground, bridge;
var leftWall, rightWall;
var jointPoint;
var jointLink;
var boy,flag,boyImg
var breakButton;
var backgroundImage;
var woodenpostImg,woodenpost,woodenpost2,invisibleGround

var collided = false;
function preload() {
  boyImg = loadImage("Boy.png");
  
  flag=loadImage("Red_flag-removebg-preview.png")
  woodenpostImg=loadImage("Wooden post.png")
  

  backgroundImage = loadImage("Game_Background_38.jpg");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);
  
  ground = new Base(0, height - 10, width * 2, 20);
  leftWall = new Base(100, height - 300, 200, height / 2 + 100);
  rightWall = new Base(width - 100, height - 300, 200, height / 2 + 100);

  bridge = new Bridge(30, { x: 50, y: height -500});
  jointPoint = new Base(width - 250, height -500, 40, 20);

  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);
  
  woodenpost=createSprite(150,700,30,30)
  woodenpost.addImage(woodenpostImg)
  woodenpost.scale=0.7
  
  woodenpost2=createSprite(1650,700,30,30)
  woodenpost2.addImage(woodenpostImg)
  woodenpost2.scale=0.7

  boy=createSprite(900,745,20,20)
  boy.addImage(boyImg)
  boy.scale=0.5
  
    
  breakButton = createButton("");
  breakButton.position(1400,100);
  breakButton.class("Cancel.png");
  breakButton.mousePressed(buttonPress);
  breakButton.size

  invisibleGround = createSprite(800,850,1200,40);
  invisibleGround.visible = false;
}

function draw() {
  background(backgroundImage);
  Engine.update(engine);

  bridge.show();

  if(keyIsDown(UP_ARROW)){
    boy.velocityY=-10
  }
  boy.velocityY = boy.velocityY + 0.8
  if(keyIsDown(RIGHT_ARROW)){
    boy.x+=10
  }
  
  boy.collide(invisibleGround)



  drawSprites()
}

function buttonPress() {
  jointLink.dettach();
  setTimeout(() => {
    bridge.break();
  }, 1500);
}