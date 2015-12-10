// ! ! !
// Three Bugs
/*
  First bug: at the start of the FOR loop, changed the argument passed to calculateSTI()
    from array to array[i].
  Second bug: in calculateSTI(), added call to Math.round() before assigning value to newArray[2].
  Third bug: in getBaseSTI(), changed the return statement: no longer subtracting 1 from basePercent
    before returning the value.

  Hard mode: added a new variable, formattedEmployeeStr, initialized to an empty string before the FOR
    loop.  Created a new nested FOR loop that iterates through each individual employee's information,
    and builds a comma-separated string from that.  Then, that string is passed into newText via
    document.createTextNode, and formattedEmployeeStr is reset to an empty string before the next
    iteration.

  Pro mode: created a new CSS file, "style.css", and linked it to "index.html".  Removed the bullet points
  by setting ul {list-style-type:none}.  Also changed the font of the individual list items.  
*/



var arrayAtticus = ["Atticus", "2405", "47000", 3];
var arrayJem = ["Jem", "62347", "63500", 4];
var arrayBoo = ["Boo", "11435", "54000", 3];
var arrayScout = ["Scout", "6243", "74750", 5];

var array = [arrayAtticus, arrayJem, arrayBoo, arrayScout];

//Create variables used to write to the DOM
var newEl, newText, position;
var formattedEmployeeStr = ""; //new variable for "Hard Mode" solution

//Capture the position of insertion into the DOM
position = document.getElementById('content');

//Loop the array, extracting each array and writing information to the DOM
//Note that the information is not 'clean'
for(var i = 0; i < array.length; i++){
	array[i] = calculateSTI(array[i]); //changed argument from "array" to "array[i]"
 	newEl = document.createElement('li');
  
  for (var j = 0; j < array[i].length; j++){ //new FOR loop to build formatted employee string
    formattedEmployeeStr += array[i][j];
    if (j < array[i].length - 1) formattedEmployeeStr += ", "
  }

	newText = document.createTextNode(formattedEmployeeStr);//replaced argument array[i] with formattedEmployeeStr
	newEl.appendChild(newText);
	position.appendChild(newEl);
  formattedEmployeeStr = ""; //reset temporary result text for next iteration
}

function calculateSTI(array1){
  var newArray = [];

  newArray[0] = array1[0];

  var employeeNumber = array1[1];
  var baseSalary = array1[2];
  var reviewScore = array1[3];

  var bonus = getBaseSTI(reviewScore) + getYearAdjustment(employeeNumber) - getIncomeAdjustment(baseSalary);
  if(bonus > 0.13){
    bonus = 0.13;
  }

  newArray[1] = bonus;
  newArray[2] = Math.round(baseSalary * (1.0 + bonus));//added call to Math.round
  newArray[3] = Math.round(baseSalary * bonus);
  console.log(newArray[0] + " " + newArray[1] + " " + newArray[2] + " " + newArray[3]);
  return newArray;
}

function getBaseSTI(reviewScore){
  var basePercent;
  switch(reviewScore){
    case 1:
      basePercent = 0;
      break;
    case 2:
      basePercent = 0;
      break;
    case 3:
      basePercent = 0.04;
      break;
    case 4:
      basePercent = 0.06;
      break;
    case 5:
      basePercent = 0.10;
      break;
  }
  return basePercent;//removed -1 from return statement
}

function getYearAdjustment(employeeNumber){
  var yearAdjustment = 0;
  if(employeeNumber.length == 4){
    yearAdjustment = 0.05;
  }
  return yearAdjustment;
}

function getIncomeAdjustment(salary){
  var incomeAdjustment = 0;
  salary = parseInt(salary);
  if(salary > 65000){
    incomeAdjustment = 0.01;
  }
  return incomeAdjustment;
}