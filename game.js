class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

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

    player1 = createSprite(100,200);
    player2 = createSprite(300,200);
    player3 = createSprite(500,200);
    player4 = createSprite(700,200);
    players = [player1, player2, player3, player4];
    passedFinish = false;

  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getFinishedPlayers();

    if(allPlayers !== undefined){
      //var display_position = 100;

      //index of the array
      var index =0;

      //x and y position of the players
      var x =200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;
        x = 200 + (index * 200) + allPlayers[plr].xPos;
        y = displayHeight - allPlayers[plr].distance ;
        //position the players a little away from each other in x direction
       // x = x + 200;
        //use data form the database to display the players in y direction
      // y = displayHeight - allPlayers[plr].distance;
        players[index-1].x = x;
        players[index-1].y = y;
        textAlign(CENTER);
        textSize(20);
        text(allPlayers[plr].name, players[index - 1].x, players[index - 1].y + 75);
       
      }

    }
    if(gameState == 1){
      if(keyDown("A") && player.index !== null){
          xVel -= 0.9;
          if(keyIsDown(37)){
              xVel -= 0.2;
          }
          if(keyIsDown(39)){
              xVel += 0.2;
          }
      }else if(keyIsDown(38) && yVel > 0 && player.index !== null){
         
          xVel *= 0.9;
      }else{
        
          xVel *= 0.985;
      }
    }else if(passedFinish === false){
      xVel *= 0.7;
      Player.updateFinishedPlayers();
      player.place = finishedPlayers;

      player.update();
      passedFinish = true;
  }else{
      xVel *= 0.8;
  }


  //move the player
  player.distance += yVel;
  player.xPos += xVel;
  xVel *= 0.985;
  player.update();
  //display sprites
  drawSprites();
}
   

displayRanks(){
  //display the medals
  camera.position.y = 0;
  camera.position.x = 0;

  imageMode(CENTER);

  Player.getPlayerInfo();

  image(bronze_img, displayWidth/-4, -100 + displayHeight/9, 200, 240);
  image(silver_img, displayWidth/4, -100 + displayHeight/10, 225, 270);
  image(gold_img, 0, -100, 250, 300);

  textAlign(CENTER);
  textSize(50);
  for(var plr in allPlayers){
      if(allPlayers[plr].place === 1){
          text("1st: " + allPlayers[plr].name, 0, 85);
      }else if(allPlayers[plr].place === 2){
          text("2nd: " + allPlayers[plr].name, displayWidth/4, displayHeight/9 + 73);
      }else if(allPlayers[plr].place === 3){
          text("3rd: " + allPlayers[plr].name, displayWidth/-4, displayHeight/10 + 76);
      }else{
          textSize(30);
          text("Honorable Mention: " + allPlayers[plr].name, 0, 225);
      }
  }
}
}