var playing=false;
var score;
var trialsleft=3;
var fruits=['apple','mango','pineapple','orange','cherry','watermelon','banana'];
var step;
var action;
$(function(){
    $("#startreset").click(function(){

        //we are playing
        if(playing==true){
            //reload page
            location.reload();
        }
        else{
            //we are not playing
            playing=true;
            //score=0
            score=0;
            $("#scorevalue").html(score);

            //show trials left
            $("#trialsleft").show();
            trialsleft=3;
            addhearts();
             
            //hide game over box
            $("#gameover").hide();

            //set startreset to reset game
            $("#startreset").html("Reset game");

            //stat sending fruits
            startaction();
        }
    });
//clixk on start rest buton
    //are we playing
        //yes
            //reload page
        //no
            //show trials left
            //change button text to reset game
            //1.create random fruit
            //2.move fruit down 1 step every 30 sec
            //is fruit loo low?
                //no-->repeat 2
                //yes-->any trials left?
                    //yes-->remove one heart and repeat 1
                    //no-->display message game over
//slice a fruit
    //play sound
    //explode fruit

$("#fruit1").mouseover(function(){
    score++;
    $("#scorevalue").html(score); //update score
    document.getElementById("slicesound").play(); //play sound
    //or we can use $("#slicesound")[0].play();

    //stop fruit going down
    stopaction();

    //hide fruit through animation
    $("#fruit1").hide("explode",500)//slice fruit

    //send new fruits
    setTimeout(startaction,800);

})
//functions
function addhearts()
{
    $("#trialsleft").empty();
    for(i=0;i<trialsleft;i++)
    $("#trialsleft").append('<img src="images/heart.png" class="life">');
}
function startaction()
{
   $("#fruit1").show();
   choosefruit();
   $("#fruit1").css({'left':Math.round(550*Math.random()),'top':-50});
   //random position

   //generat random step
   step=1+Math.random(5*Math.random());//change step

   //move fruit down by one step evry 10ms
   action=setInterval(function(){
$("#fruit1").css('top',$("#fruit1").position().top+step);

    //check if fruit is too low
    if($("#fruit1").position().top>$("#fruitscontainer").height()){
        //check if trials left
        if(trialsleft>1){
            $("#fruit1").show();
   choosefruit();
   $("#fruit1").css({'left':Math.round(550*Math.random()),'top':-50});
   //random position

   //generat random step
   step=1+Math.random(5*Math.random());//change step
    //reduce trialsleft by 1
    trialsleft--;
     //popuate trials left
     addhearts();
        }
        else{//game over
            playing=false;
            $("#startreset").html("start game");
            $("#gameover").show();
            $("#gameover").html('<p>Game over!</p><p>Your score is '+score+'</p>');
            $("#trialsleft").hide();
            stopaction();
        }
    }
   },10);
}

function choosefruit()
{
    $("#fruit1").attr('src','images/'+ fruits[Math.round(6*Math.random())]+'.png');
}
//stop dropping fruits
function stopaction()
{
    clearInterval(action);
    $("#fruits").hide();
}
});