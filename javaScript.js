
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

document.getElementById("askUs").addEventListener("click", userQInput);

function userQInput() {
    document.getElementById("qBox").innerHTML;
}

/* Adapted from https://d3-graph-gallery.com/graph/barplot_button_data_hard.html */
var data1 = [
  {group: "6 - 10 years old", value: 25},
  {group: "11 - 16 years old", value: 75},
  {group: "17 - 23 years old", value: 50}
];

var data2 = [
  {group: "6 - 10 years old", value: 33},
  {group: "11 - 16 years old", value: 67},
  {group: "17 - 23 years old", value: 95},
];


var margin = {top: 30, right: 30, bottom: 70, left: 60},
   width = 460 - margin.left - margin.right,
   height = 400 - margin.top - margin.bottom;


var svg = d3.select("#barChart")
 .append("svg")
   .attr("width", width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
 .append("g")
   .attr("transform",
         "translate(" + margin.left + "," + margin.top + ")");


var x = d3.scaleBand()
 .range([ 0, width ])
 .padding(0.2);
var xAxis = svg.append("g")
 .attr("transform", "translate(0," + height + ")")


var y = d3.scaleLinear()
 .range([ height, 0]);
var yAxis = svg.append("g")
 .attr("class", "myYaxis")



function update(data) {


 x.domain(data.map(function(d) { return d.group; }))
 xAxis.call(d3.axisBottom(x))


 y.domain([0, d3.max(data, function(d) { return d.value }) ]);
 yAxis.transition().duration(1000).call(d3.axisLeft(y));


 var u = svg.selectAll("rect")
   .data(data)

 u
   .enter()
   .append("rect") // Add a new rect for each new elements
   .merge(u) // get the already existing elements as well
   .transition() // and apply changes to all of them
   .duration(1000)
     .attr("x", function(d) { return x(d.group); })
     .attr("y", function(d) { return y(d.value); })
     .attr("width", x.bandwidth())
     .attr("height", function(d) { return height - y(d.value); })
     .attr("fill", "#69b3a2")

 // If less group in the new dataset, I delete the ones not in use anymore
 u
   .exit()
   .remove()
}

update(data1)