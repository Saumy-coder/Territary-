var playerCount, database
var game, player, form;
var player1,player2,player3,player4,players
var canvas, backgroundImage;

var gameState = 0,finishedPlayers;

var allPlayers;
var distance = 0;

var passedFinish;
var obstacles;
var s,i;


function setup(){
    createCanvas(700,1200);
    database = firebase.database();
    arena = createSprite(350,300,700,600);
    arena.shapeColor = 'green';
    gameState = 0;
    game = new Game();
}

function draw(){
    if(gameState === 0){
        game.start();
    }
    if (playerCount === 4) {
        game.update(1);
      }
    
      //start the game for real
      if (gameState === 1) {
        game.play();
      }
    
      //end the game
    
      //display ranking
     
    }
