/*HEADER_INFO
 *Programmer: Kai Schenkel
 *Data: 11/22/2024
 *Project 2: Final Submission - Client Side Programming
 *File Name: Converter_Logic.js
 *Style Info:
 *  For variables and function names I stick with camelCase put with one addition. 
 *	I add underscores '_' to variables and function names.  This is because I have 
 *  dyslexia and it makes it easier for reading and writing code.  For Classes I use 
 *  PascalCase but I add underscores '_' because of what is stated above^.
 *  For constants I use UPPERCASE_SNAKE_CASE
 *
 *References for Code: https://www.w3schools.com/jsref/jsref_isnan_number.asp	
 */
//This holds all the known exchange rates 
const RATES_OF_EXCHANGE = {
  "base": "USD",
  "date": "2022-09-24",
  "rates": { 
    "AUD": 1.531863,
    "CAD": 1.36029,
    "CLP": 950.662057,
    "CNY": 7.128404,
    "EUR": 1.03203,
    "GBP": 0.920938,
    "INR": 81.255504,
    "JPY": 143.376504,
    "RUB": 57.875038,
    "USD": 1,
    "ZAR": 17.92624  
  }  
};
//This holds all the known symbols
const CURRENCY_SYMBOLS = {
    "AUD": "Australian Dollar",
    "CAD": "Canadian Dollar",
    "CLP": "Chilean Peso",
    "CNY": "Chinese Yuan",
    "EUR": "Euro",
    "GBP": "British Pound Sterling",
    "INR": "Indian Rupee",
    "JPY": "Japanese Yen",
    "RUB": "Russian Ruble",
    "USD": "United States Dollar",
    "ZAR": "South African Rand"
};
//The conversion tables values for common increments of currency used in the fill_Tables().
const THE_VALUE_TABLE = [1, 5, 10, 25, 50, 100, 500, 1000, 5000, 10000];

const TABLE_1 = document.getElementById("table_1");
const TABLE_2 =  document.getElementById("table_2");


const TABLE_1_FROM_CURRENCY = document.getElementById("tabel_1_From_Currency");
const TABLE_1_TO_CURRENCY = document.getElementById("tabel_1_To_Currency");

const TABLE_2_FROM_CURRENCY = document.getElementById("tabel_2_To_Currency");
const TABLE_2_TO_CURRENCY = document.getElementById("tabel_2_From_Currency");

const TABLE_1_LABEL_FROM_CURRENCY = document.getElementById("tabel_1_Lable_From_Currency");
const TABLE_1_LABEL_TO_CURRENCY =document.getElementById("tabel_1_Lable_To_Currency");

const TABLE_2_LABEL_FROM_CURRENCY = document.getElementById("tabel_2_Lable_From_Currency");
const TABLE_2_LABEL_TO_CURRENCY =document.getElementById("tabel_2_Lable_To_Currency");

const TABLE_1_CONTENT_A = document.getElementById("table_1_Content_A");
const TABLE_1_CONTENT_B = document.getElementById("table_1_Content_B");

const TABLE_2_CONTENT_A = document.getElementById("table_2_Content_A");
const TABLE_2_CONTENT_B = document.getElementById("table_2_Content_B");

 
//This will fill the tables
function fill_Tables(FROM_CURRENCY, WANTED_CURRENCY){
  while(TABLE_1_CONTENT_A.firstChild && TABLE_1_CONTENT_B.firstChild && TABLE_2_CONTENT_A.firstChild && TABLE_2_CONTENT_B.firstChild){
    TABLE_1_CONTENT_A.removeChild(TABLE_1_CONTENT_A.firstChild);
    TABLE_1_CONTENT_B.removeChild(TABLE_1_CONTENT_B.firstChild);
    TABLE_2_CONTENT_A.removeChild(TABLE_2_CONTENT_A.firstChild);
    TABLE_2_CONTENT_B.removeChild(TABLE_2_CONTENT_B.firstChild);
  }
  TABLE_1.style.visibility = "visible";
  TABLE_2.style.visibility = "visible";

  TABLE_1_FROM_CURRENCY.textContent = FROM_CURRENCY;
  TABLE_1_TO_CURRENCY.textContent = WANTED_CURRENCY;

  TABLE_2_FROM_CURRENCY.textContent = FROM_CURRENCY;
  TABLE_2_TO_CURRENCY.textContent = WANTED_CURRENCY;

  TABLE_2_LABEL_FROM_CURRENCY.textContent = FROM_CURRENCY;
  TABLE_2_LABEL_TO_CURRENCY.textContent = WANTED_CURRENCY;

  TABLE_1_LABEL_FROM_CURRENCY.textContent = FROM_CURRENCY;
  TABLE_1_LABEL_TO_CURRENCY.textContent = WANTED_CURRENCY;

  
  for(let i = 0; i < THE_VALUE_TABLE.length; i++){
    const li_Tag_A1 = document.createElement("li")
    const li_Tag_B1 = document.createElement("li")

    const li_Tag_A2 = document.createElement("li")
    const li_Tag_B2 = document.createElement("li")

    let table_1_B = parseFloat(THE_VALUE_TABLE[i]);
    let tabel_2_B = parseFloat(THE_VALUE_TABLE[i]);

    let step_B1 = table_1_B / RATES_OF_EXCHANGE.rates[FROM_CURRENCY]
    let step_B2 = tabel_2_B / RATES_OF_EXCHANGE.rates[WANTED_CURRENCY]


    let converted_B1_Amount = step_B1 * RATES_OF_EXCHANGE.rates[WANTED_CURRENCY]
    let converted_B2_Amount = step_B2 * RATES_OF_EXCHANGE.rates[FROM_CURRENCY];

    li_Tag_A1.textContent = THE_VALUE_TABLE[i] + ` ${FROM_CURRENCY}`;
    li_Tag_B1.textContent = converted_B1_Amount.toFixed(5) + ` ${WANTED_CURRENCY}`;

    li_Tag_A2.textContent = THE_VALUE_TABLE[i] + ` ${WANTED_CURRENCY}`;
    li_Tag_B2.textContent = converted_B2_Amount.toFixed(5) + ` ${FROM_CURRENCY}`;

    TABLE_1_CONTENT_A.appendChild(li_Tag_A1);
    TABLE_1_CONTENT_B.appendChild(li_Tag_B1);

    TABLE_2_CONTENT_A.appendChild(li_Tag_A2)
    TABLE_2_CONTENT_B.appendChild(li_Tag_B2)
  }
  
}
const THE_AMOUNT_DISPLAY = document.getElementById("converted_amount");

//This is called when the button is clicked on the html page
function convert_Currencies_Button(){
  let result = converter_Function();
  switch(result){
    case "Invaild currency code":
      alert("Invaild currency code");
      break
    
    case "Invaild amount":
      alert("Invaild amount");
      break;
    
    default:
      break;
  }
  //console.log(result);
}



//CONVERT_BUTTON
document.addEventListener('DOMContentLoaded', () => {
  const CONVERT_BUTTON = document.getElementById("converions_Button");
  const UPDATE_DISPLAY = document.getElementById("converted_Amount");
  CONVERT_BUTTON.addEventListener('click', function(event) {
    
    event.preventDefault();

    UPDATE_DISPLAY.textContent = "Converted Amount: " + converter_Function();
    });
});



//First function for promple two 
function converter_Function(){
  const FROM_CURRENCY = document.getElementById("from-currency").value.toUpperCase();
  const WANTED_CURRENCY = document.getElementById("to-currency").value.toUpperCase();
  const THE_AMOUNT = document.getElementById("the_amount").value;
  let original_Currency = FROM_CURRENCY;
  let wanted_Currency = WANTED_CURRENCY;
  console.log(THE_AMOUNT);
  
  //This will validate both original_Currency and the wanted_Currency
  if(!RATES_OF_EXCHANGE.rates[original_Currency] || !RATES_OF_EXCHANGE.rates[wanted_Currency]){
    return "Invaild currency codes";
  }
  let the_Working_Amount = parseFloat(THE_AMOUNT);
  //Checks if the_Amount is a number and greater than 0
  if(isNaN(the_Working_Amount) || the_Working_Amount <= 0){
    return "Invaild amount";
  }
  //
  const THE_AMOUNT_IN_USD = the_Working_Amount / RATES_OF_EXCHANGE.rates[original_Currency];
  //
  const CONVERT_THE_AMOUNT = THE_AMOUNT_IN_USD * RATES_OF_EXCHANGE.rates[wanted_Currency];
  //
  const THE_WANTED_CURRENCY_CODE = CURRENCY_SYMBOLS[wanted_Currency];
  //
  if(!THE_WANTED_CURRENCY_CODE){
    return `Conversion was successful, but the currency name was not found for the code: ${wanted_Currency}`;
  }
  console.log(CONVERT_THE_AMOUNT.toFixed(2))
  let final_Amount = CONVERT_THE_AMOUNT.toFixed(2).toString();
  fill_Tables(FROM_CURRENCY, WANTED_CURRENCY);
  return final_Amount;
}

function currency_Look_Up_Button(){
  let user_Request = prompt("Enter a currency name to find the codes");
  UPDATE_INPUT_DISPLAY.textContent = user_Request;
  UPDATE_RESULT_DISPALY.textContent = JSON.stringify(Currency_Look_Up(user_Request));
  //console.log(Currency_Look_Up(user_Request));
}
//Second function for promple two 
function currency_Look_Up(user_Request){
  //
  const THE_RESULT = {};
  //
  const LOWER_CASE_LOOKUP = user_Request.toLowerCase();
  //
  for(const [THE_CODE, THE_NAME] of Object.entries(CURRENCY_SYMBOLS)){
    if(THE_CODE.toLowerCase().includes(LOWER_CASE_LOOKUP) || THE_NAME.toLowerCase().includes(LOWER_CASE_LOOKUP)){
        THE_RESULT[THE_CODE] = THE_NAME;
    }  
  }
  //
  if(Object.keys(THE_RESULT).length === 0){
    return "No matching currencies on file"
  }
  
  return THE_RESULT;
}

