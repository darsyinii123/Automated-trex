var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;

var jumpSound,dieSound,checkPointScore;

var message="I am Thevva";

var PLAY = 1;
var END = 0;

var gameState=PLAY;

var obstaclesGroup,cloudsGroup;

var score=0;

localStorage["HighScore"] = 0;

var newImage;

var restart,restartImg,gameOver,gameOverImg;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")

  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");

  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");


}

function setup() {
  createCanvas(600, 200);
  
  
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
   trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  trex.debug=false;
//trex.setCollider("circle",0,0,40);
trex.setCollider("rectangle",0,0,140,trex.height);

  ground = createSprite(200,188,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
obstaclesGroup=createGroup();
cloudsGroup=createGroup() ;

 // console.log("Hello"+ 5)

 gameOver=createSprite(300,70,10,0);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;

  restart= createSprite(300,105,10,10);
  restart.addImage(restartImg);
  restart.scale=0.4;
  
  restart.visible=false;
  gameOver.visible=false;


}

function draw() {
  background(0);
  console.log(message);

  console.log(gameState)
  
  if(gameState===PLAY){
    ground.velocityX = -4-3*score/100;
    score=score+Math.round(getFrameRate()/60);
    
    if(score>0 && score%100===0){
      checkPointSound.play()
    }

  if(keyDown("space")&& trex.y >= 100) {
   // trex.velocityY = -10;
   // jumpSound.play();
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  

  //spawn the clouds
  spawnClouds();

  spawnObstacles();

  if(obstaclesGroup.isTouching(trex)){
    //gameState=END;
    //dieSound.play();

    trex.velocityY = -10;
    jumpSound.play();
  }


 

}
  
else if(gameState===END){
  ground.velocityX=0;
  trex.velocityY=0;

  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);

  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);

  trex.changeAnimation("collided",trex_collided)

  gameOver.visible=true;
  restart.visible=true;

 if(mousePressedOver(restart)){
  reset();
 }

}

trex.collide(invisibleGround);
text("Score: "+score,500,30);
text("HI: " +localStorage["HighScore"],400,30 );
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    //assigning lifetime to the variable
    cloud.lifetime = 200

   cloudsGroup.add(cloud);

    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    }
 
}

function spawnObstacles(){

  if(frameCount % 85 === 0){
    var obstacle=createSprite(600,170,40,40);
  obstacle.velocityX=-3-score/100;

  var rand = Math.round(random(1,6));
  switch(rand){
    case 1 : obstacle.addImage(obstacle1);
    break;

    case 2 : obstacle.addImage(obstacle2);
    break;

    case 3 : obstacle.addImage(obstacle3);
    break;

    case 4 : obstacle.addImage(obstacle4);
    break;

    case 5 : obstacle.addImage(obstacle5);
    break;

    case 6 : obstacle.addImage(obstacle6);
    break;

    default:break;
  }

  obstaclesGroup.add(obstacle);
  //console.log(obstacle.x)
  obstacle.scale=0.4;
  obstacle.lifetime=200;
  }
  
}

function reset(){
  gameState=PLAY;

  cloudsGroup.destroyEach();
  obstaclesGroup.destroyEach();

  if(localStorage["HighScore"]<score){
    localStorage["HighScore"] = score;
  }

  score=0;

  gameOver.visible=false;
  restart.visible=false;

  trex.changeAnimation("running",trex_running);
  

}