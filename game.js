var runningStatus= false;
var randomNumber;
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern= [];
var randomColor;
var userColor;
var userPattern = [];
var level = 0;
var started = false;

$(document).keypress(function() {
    if(!started){
        started=true;
        nextSequence();
    }
})

$("[type=button]").click(function() {
    if(started == true && runningStatus == false){
        userColor = this.id;
    $("#"+ userColor).addClass("pressed");
    setTimeout(function (){
        $("#" + userColor).removeClass("pressed");
    }, 50);
    userPattern.push(userColor);
    checkPattern(userPattern.length - 1);
    if(started == true){
        playSound(userColor);
    }
    }
});  
//functions declared below
function nextSequence(){
    runningStatus = true;
    level++;
    userPattern = [];
    randomNumber = Math.floor(Math.random() * 4) ;
    randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);
    $("#level-title ").text("Level " + level);
    setTimeout(function(){
        for (let i=0; i < gamePattern.length; i++){
            setTimeout(function (){
               $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
            playSound(gamePattern[i]);
            }, 400*i)
        }
    },200)
    setTimeout(function(){
        runningStatus=false;
    }, 200+400*gamePattern.length-1)
}

function playSound(color){
    var sound = new Audio("./sounds/" + color + ".mp3");
    sound.play();
}
function checkPattern(patternLength){
    if(userPattern[patternLength] == gamePattern[patternLength]){
        if(userPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 500);
        }
    }
    else{
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },250)
        $("#level-title ").text("Game-Over, Press any key to Start Again");
        startOver();
    }  
}

function startOver(){
    level=0;
    userPattern=[];
    gamePattern=[];
    started=false;
}
