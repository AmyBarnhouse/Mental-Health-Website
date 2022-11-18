document.getElementById("submitBtn").addEventListener("click", thankYouMsg);

function thankYouMsg() {
  document.getElementById("tests").innerHTML = "Thank you for signing up! :)";
}

document.getElementById("emailMsg").addEventListener("mouseover", emailAlert);

function emailAlert() {
    alert("We promise to only send you helpful and relevant information.")
}

document.getElementById("myBtn").addEventListener("click", function() {
    alert("Hello World!");
  });