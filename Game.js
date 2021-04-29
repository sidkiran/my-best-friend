class Game{
    constructer () {
        
    }

    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      });
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      elsa = createSprite(100,200);
      //elsa.addImage("elsa", elsaImg);
      anna= createSprite(300,200);
      //anna.addImage("anna", annaImg);
    }
  
    play(){
      form.hide();
      
      Player.getPlayerInfo();
      
      if(allPlayers !== undefined){
        background("Pink");
        image(bg, 0, 0, displayWidth, displayHeight);
        
        //var display_position = 100;
        
        //index of the array
        var index = 0;
  
        //x and y position of the cars
        var x = 175 ;
        var y;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cars a little away from each other in x direction
          x = x + 200;
          //use data form the database to display the cars in y direction
          y = displayHeight - allPlayers[plr].distance;
          friends[index-1].x = x;
          friends[index-1].y = y;
  
          if (index === player.index){
            friends[index - 1].shapeColor = "red";
            camera.position.x = displayWidth/2;
            camera.position.y = friends[index-1].y;
          }
         
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
  
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
  
      if(player.distance > 3860){
        gameState = 2;
      }
     
      drawSprites();
    }
  
    end(){
      console.log("Game Ended");
    }
  }