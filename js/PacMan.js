/**
 * Created by Dan gleyzer on 01-May-17.
 */
var context = canvas.getContext("2d");
var shape=new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var pacmanDirection = 4;



function Start() {
    board = new Array();
    score = 0;
    pac_color="yellow";
    var cnt = 165;
    var food_remain = 120;
    var pacman_remain = 1;
    start_time= new Date();
    for (var i = 0; i < 15; i++) { // columns
        board[i] = new Array();
        //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
        for (var j = 0; j < 11; j++) { // rows
            if((i==3 && j==3)||(i==3 && j==4)||(i==3 && j==5)||(i==6 && j==1)||(i==6 && j==2))
            {
                board[i][j] = 4;// wall
            }
            else{
                var randomNum = Math.random();
                if (randomNum <= 1.0 * food_remain / cnt) {
                    food_remain--;
                    board[i][j] = 1; // circles
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
        board[emptyCell[0]][emptyCell[1]] = 1;
        food_remain--;
    }
    keysDown = {}; // dictionary
    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.keyCode] = false;
    }, false);
    interval=setInterval(UpdatePosition, 60);
}


function findRandomEmptyCell(board){
    var i = Math.floor((Math.random() * 14) + 1);
    var j = Math.floor((Math.random() * 10) + 1);
    while(board[i][j]!=0)
    {
        i = Math.floor((Math.random() * 14) + 1);
        j = Math.floor((Math.random() *10) + 1);
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

function Draw() {
    canvas.width=canvas.width; //clean board
    //canvas.fillStyle= red;
    //canvas.fillRect(0,0,canvas.width , canvas.height)
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
            } else if (board[i][j] == 1) {// the balls
                context.beginPath();
                context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            }
            else if (board[i][j] == 4) {//walls
                context.beginPath();
                context.rect(center.x-20, center.y-20, 40, 40);
                context.fillStyle = "grey"; //color
                context.fill();
            }
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
    if(board[shape.i][shape.j]==1)
    {
        score++;

    }
    board[shape.i][shape.j]=2;
    var currentTime=new Date();
    time_elapsed=(currentTime-start_time)/1000;
    if(score>=20&&time_elapsed<=10)
    {
        pac_color="green";
    }
    if(score==50)
    {
        window.clearInterval(interval);
        window.alert("Game completed");
    }
    else
    {

        Draw();
    }
}

window.addEventListener("load", Start, false);
