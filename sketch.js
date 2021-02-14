var GS=0;
var pc=0;
var form,runner,game;
var database;
var allPlayers;
var runners=[],runner1,runner2,runner3,runner4;
var finishedPlayers=0;
var finish;
var obstacleGroup,obstacle=[]
var sound=false;

function preload(){
    bronzeimg=loadImage("images/bronze.png");
    goldimg=loadImage("images/gold.png");
    silverimg=loadImage("images/silver.png");

   runner1img=loadAnimation("images/p1a.png","images/p1b.png","images/p1c.png");
   runner2img=loadAnimation("images/p2a.png","images/p2c.png","images/p2b.png");
   runner3img=loadAnimation("images/p3b.png","images/p3a.png","images/p3c.png");
   runner4img=loadAnimation("images/p4a.png","images/p4c.png","images/p4b.png");

   obstacleimg=loadImage("images/o1.png");
   trackimg=loadImage("images/track.jpg");

   asound=loadSound("applayd.wav");
}
function setup(){
    database=firebase.database();
    createCanvas(displayWidth-100,displayHeight-220);
    obstacleGroup=new Group();
    
    game = new Game();
    game.getState();
    game.start();
    
    for(var i=0,l=230;i<4;i++){
        for(var j=0,k=0;j<4;j++){
            k=k+displayWidth-200;
            obstacle[j]=createSprite(k,l,10,10);
            obstacle[j].addImage(obstacleimg);
            obstacle[j].debug=false
            obstacle[j].setCollider("rectangle",-20,0,15,40,65);
            obstacleGroup.add(obstacle[j])
        }
        l=l+140
    }
   

}
function draw(){
    background("white");
  //  drawSprites();
    
   if(pc===4&&finishedPlayers===0){
       game.updateGS(1)
   }
   if(GS===1){
       clear();
       game.play();
       if(sound===false){
       asound.loop();
       sound=true
       }
   }
   if(finishedPlayers===4){
       game.updateGS(2);
   }
   if(GS===2&&finishedPlayers===4){
      // game.end();
       game.displayRank();
   }

}

