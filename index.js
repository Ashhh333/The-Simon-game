$(document).ready(function() {
     var level = 0;
     var clicks = 0;
     var arr = ["green", "red", "yellow", "blue"];
     var user_sequence = [];
     var input_sequence = [];
     var game_started = false;
  function playaudio(x){
       var mytune= new Audio("sounds/"+x+".mp3");
       mytune.play();
  }
     function makeAnimation(random_number) {
         $("#" + arr[random_number]).addClass("selected");
         setTimeout(function() {
             $("#" + arr[random_number]).removeClass("selected");
         }, 100);
     }

     function nextSequence() {
         level++;
         $("h1").text("LEVEL " + level);
         var random_number = Math.floor(Math.random() * 4);
         makeAnimation(random_number);
         input_sequence.push(arr[random_number]);
         user_sequence = [];
         clicks = 0;
     }

     $(document).keypress(function() {
         if (!game_started) {
             game_started = true;
             level = 0;
             user_sequence = [];
             input_sequence = [];
             nextSequence();
         }
     });

     $(".btn").click(function() {
         var user_selected = $(this).attr("id");
         user_sequence.push(user_selected);
          playaudio(user_selected);
         clicks++;
         console.log("Input sequence: " + input_sequence);
         console.log("User sequence: " + user_sequence);

         if (user_sequence[clicks - 1] === input_sequence[clicks - 1]) {
             if (clicks === level) {
                 setTimeout(function() {
                     nextSequence();
                 }, 1000);
             }
         } else {
              var audio=new Audio("sounds/wrong.mp3");
              audio.play();
             $("h1").text("Game over, press any key to restart");
             $("body").addClass("game-over");
             setTimeout(function() {
                 $("body").removeClass("game-over");
             }, 500);
             game_started = false;
         }
     });
 });