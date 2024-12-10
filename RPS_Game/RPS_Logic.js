/*HEADER_INFO
 *Programmer: Kai Schenkel
 *Data: 11/22/2024
 *Project 2: Final Submission - Client Side Programming
 *File Name: RPS_Logic.js
 *Style Info:
 *  For variables and function names I stick with camelCase put with one addition. 
 *	I add underscores '_' to variables and function names.  This is because I have 
 *  dyslexia and it makes it easier for reading and writing code.  For Classes I use 
 *  PascalCase but I add underscores '_' because of what is stated above^.
 *  For constants I use UPPERCASE_SNAKE_CASE
 *
 *References for Code:	
 */

//This holds the differnt options for the game 
//Something I wanted to do was use emojis as the passing variable [🪨,📃,✂️]
const GAME_OPTIONS = ["rock","paper","scissors"];
//This const allows the script to change the text in the HTML file for the user part
const UPDATE_USER_DISPLAY = document.getElementById("display_Player_Choice");
//This const allows the script to change the text in the HTML file for the computer part
const UPDATE_COMPUTER_DISPLAY = document.getElementById("display_Computer_Choice");
//This const allows the script to change the text in the HTML file for updateing the user if they won or not
const UPDATE_RESULT = document.getElementById("display_End_Result");
//
const USER_WINS = document.getElementById("user_Score");
let user_Score = 0;
//
const COMPUTER_WINS = document.getElementById("computer_Score");
let computer_Score = 0;
//
const ROUND_DISPLAY = document.getElementById("round_Number");
let round_Counter = 0;

//adding this becuase of requirements 


function start_Game(){
  const PLAY_SCREEN = document.getElementById("play_Screen");
  const START_SCREEN = document.getElementById("start_Screen");
  const PLAY_AGAIN_BUTTON = document.getElementById("play_Again_Button");
  START_SCREEN.style.visibility = "hidden";
  PLAY_SCREEN.style.visibility = "visible";
  

  const GAME_BUTTONS = document.querySelectorAll(".game_Button");

 


  GAME_BUTTONS.forEach(button => {
    PLAY_AGAIN_BUTTON.addEventListener('click', (event) => {
      button.disabled = false;
      button.style.backgroundColor = "hsl(220, 6%, 39%)"
    });
    
    button.addEventListener('click', (event) => {
      event.preventDefault();

      button.style.backgroundColor = "green"
      user_Input = event.target.id.toLowerCase();
      playRound(user_Input);
      GAME_BUTTONS.forEach(button => button.disabled = true);
    });
  });


  let time_Left = 4;
  const TIMER_DISPLAY = document.getElementById("timer_Display")
  
  const COUNTDOWN = setInterval(() => {
    switch (time_Left) {
      case 4:
        TIMER_DISPLAY.textContent = "Rock";
        break;
      case 3:
        TIMER_DISPLAY.textContent = "Rock...Paper";
        break;
      case 2:
        TIMER_DISPLAY.textContent = "Rock...Paper...Scissors";
        break;
      case 1:
        TIMER_DISPLAY.textContent = "Rock...Paper...Scissors...Shoot!";
        break;
      case 0:
        clearInterval(COUNTDOWN)
        if(!user_Input){
          user_Input = GAME_OPTIONS[Math.floor(Math.random() * 3)]; 
          playRound(user_Input);
        }
        break
    }
    PLAY_AGAIN_BUTTON.style.visibility = "visible";
    time_Left--; 
  }, 1000)


}

function playRound(user_Input){  
  const COMPUTER_DECISION = GAME_OPTIONS[Math.floor(Math.random() * 3)]; 
  let result_Message = "";
  //This will check if the users decision matchs the computers decision 
  if (user_Input === COMPUTER_DECISION) {
    result_Message = "It's a tie";
  } else {
    switch(user_Input.toLowerCase()){
      case GAME_OPTIONS[0]:
        result_Message = (COMPUTER_DECISION === "scissors") ? "You Win" : "You Losts"
      break
      case GAME_OPTIONS[1]:
        result_Message = (COMPUTER_DECISION === "rock") ? "You Win" : "You Losts"
      break
      case GAME_OPTIONS[2]:
        result_Message = (COMPUTER_DECISION === "paper") ? "You Win" : "You Losts"
      break
      default:
        result_Message = "That is not something you can enter"
        alert(result_Message);
      break
      }
  }
  UPDATE_USER_DISPLAY.textContent = `USER Chose: ${user_Input}`;
  UPDATE_COMPUTER_DISPLAY.textContent = `COMPUTER Chose: ${COMPUTER_DECISION}`;
  UPDATE_RESULT.textContent = result_Message;
  
  UPDATE_RESULT.classList.remove("winning_Text", "losing_Text");
  switch(result_Message){
    case "You Win":
      UPDATE_RESULT.classList.add("winning_Text");
      user_Score++;
      USER_WINS.textContent = user_Score;
    break;
    case "You Losts":
      UPDATE_RESULT.classList.add("losing_Text");
      computer_Score++
      COMPUTER_WINS.textContent = computer_Score;
    break    
  }
  round_Counter++;
  ROUND_DISPLAY.textContent = round_Counter;
}


