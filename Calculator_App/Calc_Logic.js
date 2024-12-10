/*HEADER_INFO
 *Programmer: Kai Schenkel
 *Data: 11/22/2024
 *Project 2: Final Submission - Client Side Programming
 *File Name: Calc_Logic.js
 *Style Info:
 *  For variables and function names I stick with camelCase put with one addition. 
 *	I add underscores '_' to variables and function names.  This is because I have 
 *  dyslexia and it makes it easier for reading and writing code.  For Classes I use 
 *  PascalCase but I add underscores '_' because of what is stated above^.
 *  For constants I use UPPERCASE_SNAKE_CASE
 *
 *  References for Code: 
 *    YouTube Video: Channle Name -> Bro Code, link -> https://youtu.be/I5kj-YsmWjM?si=j2MUsRFliZldlyC1  	
 */

//let text_Prompt = prompt("Enter a mathematical operation");


const THE_DARK_MODE_TOGGLE = document.getElementById('dark_Mode_Switch')

THE_DARK_MODE_TOGGLE.addEventListener("click", () => {
  console.log("It was switched");
  document.body.classList.toggle("dark-mode");
});




const UPDATE_HISTORY_DISPLAY =  document.getElementById("history_Display");
const CALC_OPERATIONS = ["+","-","*","/","%","="];

UPDATE_HISTORY_DISPLAY.textContent = "" 

let current_Equation = "";
let calc_Memory = [];

const UPDATE_CALC_DISPLAY = () => {
  document.getElementById("the_Calculator_Display").value = current_Equation;
}; 

function digit_Input(the_Digit){
  current_Equation += the_Digit
  UPDATE_CALC_DISPLAY();
}

function operator_Input(the_Operator){
  current_Equation += the_Operator
  UPDATE_CALC_DISPLAY();
}

function decimal_Input(){
  let equation_Parts = current_Equation.split(/([+\-*/])/);
  let the_Last_Number = equation_Parts[equation_Parts.length - 1];
  if(!the_Last_Number.includes(".")){
    current_Equation += ".";
  }
  UPDATE_CALC_DISPLAY();
}
 
function toggle_Negtive_Sign(){
  let the_Parts = current_Equation.trim().split(" ");
  let last_Part = the_Parts.pop();

  if(!isNaN(last_Part)){
    last_Part = (parseFloat(last_Part) * -1).toString();
    the_Parts.push(last_Part);
  } else {
    the_Parts.push("-" + last_Part);
  }

  current_Equation = the_Parts.join("");
  UPDATE_CALC_DISPLAY();
}

function the_Percent_Input(){
  let equation_Parts = current_Equation.split(/([+\-*/])/);
  let last_Number = equation_Parts[equation_Parts.length - 1].trim();
  

  if(last_Number && !last_Number.includes("%")){
    current_Equation += "%"
  } 
  UPDATE_CALC_DISPLAY();
}


function clear_Calc_Display(){
  let clear_Message = "=====(CLEAR)====="
  calc_Memory.push(clear_Message);
  current_Equation = "";
  UPDATE_CALC_DISPLAY();
  update_History();
}

function update_History(){
  UPDATE_HISTORY_DISPLAY.innerHTML = calc_Memory.map(entry => `<div>${entry}</div>`).join('');
}


function calculate_Equation_Array(){
  console.log(current_Equation)
  if(current_Equation.trim() === "") return;

  try {
    let equation_Array = current_Equation.replace(/^\s*-\s*/, '0-').split(/([+\-*/%])/).filter(Boolean);

    for (let i = 0; i < equation_Array.length; i++) {
      if(equation_Array[i] === '%'){
        let value_X = parseFloat(equation_Array[i - 1]);
        let value_Y = parseFloat(equation_Array[i + 1]);

        equation_Array[i - 1] = value_X / 100;
        equation_Array[i] = '*'
        equation_Array[i + 1] = value_Y
      }
      
    }

    let working_Equation = equation_Array.map(char_Value => (isNaN(char_Value) ? char_Value : parseFloat(char_Value))); 
    for (let i = 0; i < working_Equation.length; i++) {
      if(working_Equation[i] === CALC_OPERATIONS[2] || working_Equation[i] === CALC_OPERATIONS[3]){
        let operator = working_Equation[i];
        let value_A = working_Equation[i - 1];
        let value_B = working_Equation[i + 1];
        let the_Result;

        if(operator === CALC_OPERATIONS[2]){
          the_Result = value_A * value_B;
        } else if(operator === CALC_OPERATIONS[3]) {
          the_Result = value_A / value_B;
        }

        working_Equation.splice(i - 1, 3, the_Result);
        i--;
      }
    }

    let the_Final_Result = working_Equation[0];
    for(let i = 1; i < working_Equation.length; i++){
      if(working_Equation[i] === CALC_OPERATIONS[0]){
        the_Final_Result += working_Equation[i + 1]
      } else if(working_Equation[i] === CALC_OPERATIONS[1]){
        the_Final_Result -= working_Equation[i + 1]
      }
      i++
    }
    current_Equation = `${current_Equation} = ${the_Final_Result}`;
    calc_Memory.push(current_Equation);
    UPDATE_CALC_DISPLAY();
    update_History()
  } catch (error) {
    current_Equation = "Error"
    UPDATE_CALC_DISPLAY();
    console.error(error);
  }
}

/*function run_Calculator(){
  let equation_Array = [];
  let user_Input;

  while(IS_RUNNING){
    user_Input = prompt("Enter a number or a operator, then Enter '=' to calculate: ");
    if(user_Input === "="){
      break;
    }

    if(!isNaN(user_Input) || CALC_OPERATIONS.includes(user_Input)){
      equation_Array.push(user_Input);
    } else {
      alert("That dose not work for a calculator, please enter a vaild number or operator");
    }
  }
  UPDATE_EQUATION.textContent = equation_Array.toString();
  let calculation_Complete = calculate_Equation_Array(equation_Array);
  if(calculation_Complete === null){
    alert("ERROR ----> " + calculation_Complete)
    UPDATE_RESULT.textContent = "ERROR"
  } else {
    UPDATE_RESULT.textContent = calculation_Complete.toString();  
    alert("Here is what the value is: " + calculation_Complete);
  }
}
*/