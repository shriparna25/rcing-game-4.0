class Game {
    constructor() {}

    getgameState(){
        database.ref("gameState").on("value", function(data){
            gameState= data.val();
        })
    }
    
    updategameState(state){
        database.ref('/').update({
            gameState : state
        })
    }



    async start(){
        if(gameState === 0){
            background(cbg_img);
        
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getplayerCount();
            }
           
            form = new Form();
            form.display();

        }
        car1 = createSprite(100, 200);
        car1.addImage(car1_img);
        car2 = createSprite(300, 200);
        car2.addImage(car2_img);
        car3 = createSprite(500, 200);
        car3.addImage(car3_img);
        car4 = createSprite(700, 200);
        car4.addImage(car4_img);
        cars=[car1, car2, car3, car4]

    }

    play(){
        form.hide();
        textSize(30);
      
        Player.getPlayerInfo();
        player.getcaratend();
        if(allPlayers!= undefined){
            background(ground);
            image(track, 0, -height*4, width, height*5);
          var index = 0 ;
          var x = 200;
           var y = 0;
          
            for(var i in allPlayers){
                index = index + 1;
                x = x + 300;
                y = height - allPlayers[i].distance;
                
                cars[index - 1].x = x;
                cars[index - 1].y = y;

                if(index ===  player.index){
                    stroke(10);
                    fill("red");
                    ellipse(x, y, 60, 60);
                    camera.position.x = width/2;
                    camera.position.y = cars[index - 1].y;
                    cars[index - 1].shapeColor= "red";
                }
                else{
                    cars[index - 1].shapeColor= "black";
                }
              
          
            }
        }
        if(keyIsDown(UP_ARROW )&& player.index != null){
            player.distance += 50;
            player.update();
        }

        if(player.distance>4500){
            gameState = 2;
            player.rank += 1;
            Player.updatecarsatend(player.rank);

            
        }
        drawSprites();
    }
    
    end(){
        console.log("game ended")
        rectMode(CENTER);
        fill("grey");
        rect(width/2, cars[player.index - 1].y -  300, 500, 500);
        imageMode(CENTER);
        image(trophy, width/2  , cars[player.index - 1].y -  300, 150, 150 );
        fill("black");
        textSize(30);
        text("Your Rank Is : " + player.rank, width/2 -70, cars[player.index - 1].y -  150);
        form.title.hide();

    }

}