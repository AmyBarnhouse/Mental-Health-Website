
/* Displays thank you message after user submits form */ 
document.getElementById("submitBtn").addEventListener("click", thankYouMsg);

function thankYouMsg() {
  document.getElementById("tests").innerHTML = "Thank you for signing up! :)";
}


/* Displays alert to user when they click to put in their email address */
document.getElementById("emailMsg").addEventListener("click", emailAlert);

function emailAlert() {
    alert("We promise to only send you helpful and relevant information.")
}

document.getElementById("questionBox").addEventListener("click", userQInput);

function userQInput() {
  document.getElementById("tests").innerHTML = "Thank you for signing up! :)";
}