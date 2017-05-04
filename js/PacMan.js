/**
 * Created by Dan gleyzer on 01-May-17.
 */
var context = canvas.getContext("2d");
var shape=new Object();
var BonusItem=new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var interval2;
var pacmanDirection = 4;
var boardOfMonsters ;
var numBalls_5_point ;
var numBalls_15_point ;
var numBalls_25_point ;
var counter =0;
var LOST = false;

monster1 = new Image() ;
monster1.src= "images/monster2.png";
monster2 = new Image() ;
monster2.src= "images/monster6.png";
monster3 = new Image() ;
monster3.src= "images/monster4.png";
ball_5points= new Image() ;
ball_5points.src="images/5point.png";
ball_15points= new Image() ;
ball_15points.src="images/15points.png";
ball_25points= new Image() ;
ball_25points.src="images/25points.png";
BonusItemImage= new Image() ;
BonusItemImage.src="images/bonusItem.png";

function Start() {
    board = new Array();
    score = 0;
    pac_color="yellow";
    var cnt = 165;
    var food_remain = 90;
    numBalls_5_point = Math.floor(food_remain/0.6) ;
    numBalls_15_point = Math.floor(food_remain/0.3) ;
    numBalls_25_point = Math.floor(food_remain/0.1) ;
    var pacman_remain = 1;
    start_time= new Date();

    for (var i = 0; i < 15; i++) { // columns
        board[i] = new Array();
        //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
        for (var j = 0; j < 11; j++) { // rows
            if((i==3 && j==3)||(i==3 && j==4)||(i==3 && j==5)||(i==3 && j==5)||(i==6 && j==1)||(i==6 && j==2))
            {
                board[i][j] = 4;// wall
            }
            else{
                var randomNum = Math.random();
                if (randomNum <= 1.0 * food_remain / cnt) {
                    food_remain--;
                    board[i][j] = randomBalls(); // circles
                } else if (randomNum < 1.0 * (pacman_remain + food_remain) / cnt) {
                    shape.i=i;
                    shape.j=j;
                    pacman_remain--;
                    board[i][j] = 2; // pacman
                } else {
                    board[i][j] = 0;  //empty
                }
                cnt--;
            }
        }
    }
    while(food_remain>0){
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = randomBalls();
        food_remain--;
    }







    keysDown = {}; // dictionary
    addEventListener("keydown", function (e) {
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
        keysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.keyCode] = false;
    }, false);
    setMonsters(3) ;
     BonusItem.i = 14 ;
     BonusItem.j = 10 ;
     chooseRandomSpotForBonusItem() ;
    interval=setInterval(UpdatePosition, 60);
}

function setMonsters (numOfMonsters)
    {
    boardOfMonsters = new Array();
        var monsterId=1;
     for (var i = 0; i < 15; i++) { // columns
            boardOfMonsters[i] = [];
            for (var j = 0; j < 11; j++) { // rows
                if ( (i==0 && j == 0) || (i==14 && j == 0 && numOfMonsters>1) || (i==0 && j == 10 && numOfMonsters>2))
                {
                      boardOfMonsters[i][j] = monsterId ;
                        monsterId++;
                }
                else
                {
                      boardOfMonsters[i][j] = 0 ;
                }
            }
     }
}

function findRandomEmptyCell(board){
    var i = Math.floor((Math.random() * 13) + 1);
    var j = Math.floor((Math.random() * 9) + 1);
    while(board[i][j]!=0)
    {
        i = Math.floor((Math.random() * 13) + 1);
        j = Math.floor((Math.random() *9) + 1);
    }
    return [i,j];
}

function GetKeyPressed() {
    if (keysDown[38]) {// up
        return 1;
    }
    if (keysDown[40]) {//down
        return 2;
    }
    if (keysDown[37]) {//left
        return 3;
    }
    if (keysDown[39]) {//right
        return 4;
    }
}

function moveMonsters ()
{
var up ;
var down ;
var left ;
var right ;
var moved ={};
 for (var i = 0; i < 15; i++) { // columns
        for (var j = 0; j < 11; j++) { // rows

        if (boardOfMonsters[i][j]>0) {
            if (i > 0 && board[i - 1][j] < 3 && boardOfMonsters[i - 1][j] == 0) {
                left = (Math.abs(i - 1 - shape.i) + Math.abs(j - shape.j))
            } else {
                left = 100000
            }
            if (i < 14 && board[i + 1][j] < 3 && boardOfMonsters[i + 1][j] == 0) {
                right = (Math.abs(i + 1 - shape.i) + Math.abs(j - shape.j))
            } else {
                right = 100000
            }
            if (j < 10 && board[i][j + 1] < 3 && boardOfMonsters[i][j + 1] == 0) {
                down = (Math.abs(i - shape.i) + Math.abs(j + 1 - shape.j))
            } else {
                down = 100000
            }
            if (j > 0 && board[i][j - 1] < 3 && boardOfMonsters[i][j - 1] == 0) {
                up = (Math.abs(i - shape.i) + Math.abs(j - 1 - shape.j))
            } else {
                up = 100000
            }

            var min = Math.min(up, down, right, left);

            if (min != 100000 && moved[boardOfMonsters[i][j]]===undefined) {
                if (min == left ) {
                    boardOfMonsters[i - 1][j] = boardOfMonsters[i][j];
                    if( board[i - 1][j]==2) LOST=true;
                    moved[boardOfMonsters[i][j]]=true;
                    boardOfMonsters[i][j] = 0;
                }
                else if (min == right) {
                    boardOfMonsters[i + 1][j] = boardOfMonsters[i][j];
                    if( board[i + 1][j]==2) LOST=true;
                    moved[boardOfMonsters[i][j]]=true;
                    boardOfMonsters[i][j] = 0;
                }
                else if (min == up) {
                    boardOfMonsters[i][j - 1] = boardOfMonsters[i][j];
                    if( board[i][j - 1]==2) LOST=true;
                    moved[boardOfMonsters[i][j]]=true;
                    boardOfMonsters[i][j] = 0;
                }
                else if (min == down) {
                    boardOfMonsters[i][j + 1] = boardOfMonsters[i][j];
                    if( board[i][j + 1]==2) LOST=true;
                    moved[boardOfMonsters[i][j]]=true;
                    boardOfMonsters[i][j] = 0;
                }
            }
        }
        }

 }
}

function Draw() {
    canvas.width=canvas.width; //clean board
    lblScore.value = score;
    lblTime.value = time_elapsed;
    var pacmanStartDraw ;
    var pacmanEndDraw ;
    var pacmanEyeDrawX ;
    var pacmanEyeDrawY ;

    if (pacmanDirection == 1 ){ // draw pacman up
    pacmanStartDraw = 1.65 ;
    pacmanEndDraw = 1.35 ;
     pacmanEyeDrawX = -15 ;
     pacmanEyeDrawY = -5 ;
    }
    if (pacmanDirection == 2 ){//draw pacman down
         pacmanStartDraw = 0.65 ;
         pacmanEndDraw = 0.35 ;
         pacmanEyeDrawX = -15 ;
         pacmanEyeDrawY = 5 ;
         }
    if (pacmanDirection == 3 ){//left
             pacmanStartDraw = 1.15 ;
             pacmanEndDraw = 0.85 ;
             pacmanEyeDrawX = -5 ;
             pacmanEyeDrawY = -15 ;
    }
    if (pacmanDirection == 4 ){//right
         pacmanStartDraw = 0.15 ;
         pacmanEndDraw = 1.85 ;
         pacmanEyeDrawX = 5 ;
         pacmanEyeDrawY = -15 ;
                          }
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 11; j++) {
            var center = new Object();
            center.x = i * 40 + 20; // i column
            center.y = j * 40 + 20;// j rows
            if (board[i][j] == 2) {//pacman
                context.beginPath();
                context.arc(center.x, center.y, 20, pacmanStartDraw * Math.PI, pacmanEndDraw * Math.PI); // half circle
                context.lineTo(center.x, center.y);
                context.fillStyle = pac_color; //color
                context.fill();
                context.beginPath();
                context.arc(center.x+pacmanEyeDrawX, center.y + pacmanEyeDrawY,2 , 0, 2 * Math.PI); // circle eye
                context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] == 1.05)
            {// the balls 5
                context.drawImage(ball_5points,center.x-15, center.y-15,25,25);
            }
            else if (board[i][j] == 1.15)
            {
                  context.drawImage(ball_15points,center.x-15, center.y-15,25,25);
            }
             else if (board[i][j] == 1.25)
                  {
                       context.drawImage(ball_25points,center.x-15, center.y-15,25,25);
                  }
            else if (board[i][j] == 4) {//walls
                context.beginPath();
                context.rect(center.x-20, center.y-20, 40,40);
                context.fillStyle = "grey"; //color
                context.fill();
            }
            if (boardOfMonsters[i][j]==1 )
            {
                context.drawImage(monster1,center.x-20, center.y-20,40,40);
            }
            else if (boardOfMonsters[i][j]==2 )
            {
                context.drawImage(monster2,center.x-20, center.y-20,40,40);
            }
            else if (boardOfMonsters[i][j]==3 ){
                context.drawImage(monster3,center.x-20, center.y-20,40,40);
            }
            context.drawImage(BonusItemImage,BonusItem.i*40 ,BonusItem.j*40  ,40,40);

        }
    }
}
function UpdatePosition() {
    board[shape.i][shape.j]=0;
    var x = GetKeyPressed()
    if(x==1)
    {
        if(shape.j>0 && board[shape.i][shape.j-1]!=4)
        {
            shape.j--;
            pacmanDirection= x ;
        }
    }
    if(x==2)
    {
        if(shape.j<10 && board[shape.i][shape.j+1]!=4)
        {
            shape.j++;
            pacmanDirection= x ;
        }
    }
    if(x==3)
    {
        if(shape.i>0 && board[shape.i-1][shape.j]!=4)
        {
            shape.i--;
            pacmanDirection= x ;
        }
    }
    if(x==4)
    {
        if(shape.i<14 && board[shape.i+1][shape.j]!=4)
        {
            shape.i++;
            pacmanDirection= x ;
        }
    }
    if(board[shape.i][shape.j]==1.05)
    {
        score+=5;
    }
    if(board[shape.i][shape.j]==1.15)
    {
        score+=15;
    }
    if(board[shape.i][shape.j]==1.25)
    {
        score+=25;
    }

    board[shape.i][shape.j]=2;
    var currentTime=new Date();
    time_elapsed=(currentTime-start_time)/100;
    if(score>=20&&time_elapsed<=10)
    {
        pac_color="green";
    }
    if(score==500 || LOST)
    {
        var message;
        window.clearInterval(interval);
        if(score==500)
         message ="We have a Winner!!";
        else
            message="You Lost";
        window.alert(message);
    }
    else
    {
        if (counter%15 == 0)
        {
            moveMonsters();
            moveBonusItem();
        }
        Draw();
        if(boardOfMonsters[shape.i][shape.j]>0){
            LOST=true;
        }
        counter ++ ;
    }
}

function randomBalls ()
{
    while (true){
    var randomNum = Math.random();
    if (randomNum<=0.6 && numBalls_5_point>0 )
    {
        return 1.05;
    }
    if (randomNum>0.6 && randomNum<=0.9 && numBalls_15_point>0 )
    {
            return 1.15;
    }
    if (randomNum>0.9 &&  numBalls_25_point>0)
    {
        return 1.25 ;
    }
    if (numBalls_5_point==0 && numBalls_15_point==0 && numBalls_25_point==0)
    {
        return 0 ;
    }
    }
}
function moveBonusItem ()
{
var up ;
var down ;
var left ;
var right ;
var i = BonusItem.i ;
var j = BonusItem.j ;
var nextI = BonusItem.nextI ;
var nextJ = BonusItem.nextJ ;


    if (i==nextI &&j ==nextJ)
    {

            chooseRandomSpotForBonusItem();
    }

     if (i > 0 && board[i - 1][j] < 4 )
     {
     left = (Math.abs(i - 1 - nextI) + Math.abs(j - nextJ))
     } else {
                 left = 100000
            }
     if (i < 14 && board[i + 1][j] < 4 )
     {
        right = (Math.abs(i + 1 - nextI) + Math.abs(j - nextJ))
     } else {
                    right = 100000
            }
     if (j < 10 && board[i][j + 1] <4 )
     {
                    down = (Math.abs(i - nextI) + Math.abs(j + 1 - nextJ))
     } else {
                    down = 100000
            }
    if (j > 0 && board[i][j - 1] < 4)
    {
            up = (Math.abs(i - nextI) + Math.abs(j - 1 - nextJ))
    } else {
                    up = 100000
           }
   var min = Math.min(up, down, right, left);
        if (min == left)
        {
            BonusItem.i = i-1 ;
             BonusItem.j = j ;
        }
        else if (min == right)
        {
                           BonusItem.i = i+1 ;
                           BonusItem.j = j ;
        }
        else if (min == up)
         {
                           BonusItem.i = i ;
                           BonusItem.j = j-1 ;
         }
         else if (min == down)
         {
                            BonusItem.i = i ;
                            BonusItem.j = j+1 ;
         }
}

function chooseRandomSpotForBonusItem ()
{
      var i = Math.floor((Math.random() * 13) + 1);
      var j = Math.floor((Math.random() * 9) + 1);
      while(board[i][j]>1.5)
      {
            i = Math.floor((Math.random() * 13) + 1);
            j = Math.floor((Math.random() *9) + 1);
      }

       BonusItem.nextI =i ;
       BonusItem.nextJ =j ;
}

window.addEventListener("load", Start, false);
