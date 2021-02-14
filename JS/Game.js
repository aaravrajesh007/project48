class Game{
    
     constructor(){

     }
    getState(){
        var GSref=database.ref('gameState');
        GSref.on("value",function(data){
            GS=data.val();
        })

    }
    updateGS(state){
        database.ref('/').update({
          'gameState':state  
        })
    }
   async start(){
        if(GS===0){
            runner=new Player();
            var pcref=await database.ref('playerCount').once("value");
            if(pcref.exists()){
                pc=pcref.val();
                runner.getCount();
            }
            form=new Form();
            form.display();
        }
    runner1=createSprite(50,50);
    runner1.addAnimation("run",runner1img);
    runner1.debug=false
    runner1.setCollider("rectangle",0,0,20,30)

    runner2=createSprite(50,150);
    runner2.addAnimation("running",runner2img);
    runner2.debug=false
    runner2.setCollider("rectangle",0,0,20,40)

    runner3=createSprite(50,300);
    runner3.addAnimation("runner",runner3img);
    runner3.scale=0.5;
    runner3.debug=false
    runner3.setCollider("rectangle",0,0,20,60)

    runner4=createSprite(50,500);
    runner4.addAnimation("runs",runner4img);
    runner4.scale=0.26;
    runner4.debug=false
    runner4.setCollider("rectangle",0,20,20,150)
   
    runners=[runner1,runner2,runner3,runner4]
    
        finish=false;
    }
    play(){
        form.formHide();
                Player.getPlayerinfo();
                runner.getPlayersAtEnd();
               
        if(allPlayers!==undefined){
            background(46)
            image(trackimg,-displayWidth,0,displayWidth*5,displayHeight)
            var index=0;
            var x=-displayWidth+200;
            var y=100;
            for( var plr in allPlayers){
                index=index+1
                 y=y+130;
                 x=0;
                x = allPlayers[plr].distance-displayWidth+300;
                
                 runners[index-1].x=x
                 runners[index-1].y=y
                 fill("white");  
              if(index===runner.index){
                  strokeWeight(10);
                  fill("green");
                 // ellipse(x,y,60,60);
                  runners[index-1].shapeColor="red";
                  camera.position.x=runners[index-1].x;
                  camera.position.y=displayHeight/2;
                  
                  if(keyIsDown(UP_ARROW)&&runner.distance<7300){
                      runners[index-1].y-=50;
                      runner.distance+=80;
                      runner.update();
                  }
                  
              }
              textAlign(CENTER);
              textSize(20);
              text(allPlayers[plr].name, runners[index - 1].x, runners[index - 1].y + 75);
   
            }
        }
        for(var i=0;i<4;i++){
            if(runners[i].isTouching(obstacleGroup)){
                runner.distance=0;
                runner.update();


            }
        }
      if(keyIsDown(RIGHT_ARROW)&&runner.index!==null&&finish!==true){
          runner.distance+=50;
          runner.update();
      }  

      if(keyIsDown(LEFT_ARROW)&&runner.index!==null&&finish!==true){
        runner.distance-=50;
        runner.update();
    }
      if(runner.distance>7350&&finish===false){
          runner.rank+=1
          finishedPlayers=runner.rank
         // GS=2;
          Player.updatePlayersAtEnd(runner.rank)
          console.log("Rank:"+runner.rank)
          finish=true;
      }
    drawSprites();
    }
    displayRank(){
        camera.position.x=0;
        camera.position.y=0;
        imageMode(CENTER);
        Player.getPlayerinfo();
        image(bronzeimg,displayWidth/-4,-100+displayHeight/9,200,240)
        image(silverimg,displayWidth/4,-100+displayHeight/10,225,270)
        image(goldimg,0,-100,250,300)
        textAlign(CENTER)
        textSize(50)
        for(var plr in allPlayers){
            if(allPlayers[plr].rank===1){
                text("1st :"+allPlayers[plr].name,-25,85);
            }
            else
            if(allPlayers[plr].rank===2){
                text("2nd :"+allPlayers[plr].name,displayWidth/4,displayHeight/9+73);
            }
            else if(allPlayers[plr].rank===3){
                text("3rd :"+allPlayers[plr].name,displayWidth/-4,displayHeight/10+76);
            }
            else{
                textSize(30);
                text("Honourable Mention: "+allPlayers[plr].name,0,225)
            } 
        }

    }
    
}