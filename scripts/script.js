/* global d3 */
/* global currentOpacity */

/* from w3schools - mouseover events - https://www.w3schools.com/js/js_htmldom_eventlistener.asp */
/** using DOM to change the background colour of the container that the user is in when they hover inside it, then change it back when they mouseout */
document.getElementById('colourBackStigma').addEventListener('mouseover', function () {
  document.getElementById('colourBackStigma').style.backgroundColor = '#f8ebfa';
});

document.getElementById('colourBackIntro').addEventListener('mouseover', function () {
  document.getElementById('colourBackIntro').style.backgroundColor = '#f8ebfa';
});

document.getElementById('colourBackTrend').addEventListener('mouseover', function () {
  document.getElementById('colourBackTrend').style.backgroundColor = '#f8ebfa';
});

document.getElementById('colourBackStigma').addEventListener('mouseout', function () {
  document.getElementById('colourBackStigma').style.backgroundColor = '#fff';
});

document.getElementById('colourBackIntro').addEventListener('mouseout', function () {
  document.getElementById('colourBackIntro').style.backgroundColor = '#fff';
});

document.getElementById('colourBackTrend').addEventListener('mouseout', function () {
  document.getElementById('colourBackTrend').style.backgroundColor = '#fff';
});

document.getElementById('colourBackScatter').addEventListener('mouseover', function () {
  document.getElementById('colourBackScatter').style.backgroundColor = '#f8ebfa';
});

document.getElementById('colourBackScatter').addEventListener('mouseout', function () {
  document.getElementById('colourBackScatter').style.backgroundColor = '#fff';
});

document.getElementById('emailMsg').addEventListener('click', emailAlert);
/** Displays alert to user when they click to put in their email address. */
function emailAlert () {
  alert('We promise to only send you helpful and relevant information.');
}

/* From d3 gallery - Connected scatter plot with interactive legend - https://d3-graph-gallery.com/graph/connectedscatter_legend.html */
/* Defining the dimensions of the scatter-line graph */
const margin1 = { top: 30, right: 500, bottom: 30, left: 30 };
const width1 = 500 - margin1.left - margin1.right;
const height1 = 400 - margin1.top - margin1.bottom;

/* Linking the d3 to the div element in html where the graph will be placed on the page */
const svg1 = d3.select('#my_dataviz')
  .append('svg')
  .attr('width', width1 + margin1.left + margin1.right)
  .attr('height', height1 + margin1.top + margin1.bottom)
  .append('g')
  .attr('transform',
    'translate(' + margin1.left + ',' + margin1.top + ')');

/** This function produces the d3 interactive graph.
 * I have included a legend with different labels, and when clicking on each one the opacity of the graph changes between 0 and 100%.
 * This means that each variable can be viewed individually, or compared with the others. */
d3.csv('datasets/scatterDataset.csv', function (data1) {
  /* Variables being plotted on the graph: */
  const allGroup = ['Insomnia', 'Anxiety', 'Depression'];
  const dataReady = allGroup.map(function (grpName) {
    return {
      name: grpName,
      values: data1.map(function (d) {
        return { Age: d.Age, value: +d[grpName] };
      })
    };
  });
  const myColor = d3.scaleOrdinal()
    .domain(allGroup)
    .range(d3.schemeSet2);
    /* x-axis */
  const x = d3.scaleLinear()
    .domain([18, 24])
    .range([0, width]);
  svg1.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x));
  /* y-axis */
  const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0]);
  svg1.append('g')
    .call(d3.axisLeft(y));
  const line = d3.line()
    .x(function (d) { return x(+d.Age); })
    .y(function (d) { return y(+d.value); });
    /* lines between each data point */
  svg1.selectAll('myLines')
    .data(dataReady)
    .enter()
    .append('path')
    .attr('class', function (d) { return d.name; })
    .attr('d', function (d) { return line(d.values); })
    .attr('stroke', function (d) { return myColor(d.name); })
    .style('stroke-width', 4)
    .style('fill', 'none');
  /* plots the data points */
  svg1
    .selectAll('myDots')
    .data(dataReady)
    .enter()
    .append('g')
    .style('fill', function (d) { return myColor(d.name); })
    .attr('class', function (d) { return d.name; })
    .selectAll('myPoints')
    .data(function (d) { return d.values; })
    .enter()
    .append('circle')
    .attr('cx', function (d) { return x(d.Age); })
    .attr('cy', function (d) { return y(d.value); })
    .attr('r', 5)
    .attr('stroke', 'white');
  /* adds labels to the right of each coloured line graph */
  svg1
    .selectAll('myLabels')
    .data(dataReady)
    .enter()
    .append('g')
    .append('text')
    .attr('class', function (d) { return d.name; })
    .datum(function (d) { return { name: d.name, value: d.values[d.values.length - 1] }; })
    .attr('transform', function (d) { return 'translate(' + x(d.value.Age) + ',' + y(d.value.value) + ')'; })
    .attr('x', 12)
    .text(function (d) { return d.name; })
    .style('fill', function (d) { return myColor(d.name); })
    .style('font-size', 15);
  /* adds a legend with buttons that can be changed to alter opacity for enhanced user experience */
  svg1
    .selectAll('myLegend')
    .data(dataReady)
    .enter()
    .append('g')
    .append('text')
    .attr('x', function (d, i) { return 30 + i * 80; })
    .attr('y', 30)
    .text(function (d) { return d.name; })
    .style('fill', function (d) { return myColor(d.name); })
    .style('font-size', 15)
    /** This function swaps the opacity of each variable between 0 and 1 using a control 'if' statement. */
    .on('click', function (d) {
      currentOpacity = d3.selectAll('.' + d.name).style('opacity');
      d3.selectAll('.' + d.name).transition().style('opacity', currentOpacity == 1 ? 0 : 1);
    });
});

/* From d3 gallery - Button to change input data in barplot - https://d3-graph-gallery.com/graph/barplot_button_data_csv.html */
const margin = { top: 30, right: 30, bottom: 70, left: 60 };
const width = 460 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

/* finds correct id in html file where bar chart is being placed */
const svg = d3.select('#barChartVisual')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform',
    'translate(' + margin.left + ',' + margin.top + ')');

/* x-axis */
const x = d3.scaleBand()
  .range([0, width])
  .padding(0.2);
const xAxis = svg.append('g')
  .attr('transform', 'translate(0,' + height + ')');

/* y-axis */
const y = d3.scaleLinear()
  .range([height, 0]);
const yAxis = svg.append('g')
  .attr('class', 'myYaxis');

/** This function imports the dataset and presents it in a bar chart, where connected radio buttons change the data of the graph and  variables can be compared.
 * The y-axis shifts when the buttons are pressed to scale up to where the maximum percentage value is.
  */
function update (selectedVar) {
  /* Parses the dataset */
  d3.csv('datasets/barChartDataset.csv', function (data) {
    x.domain(data.map(function (d) { return d.group; }));
    xAxis.transition().duration(1000).call(d3.axisBottom(x));
    y.domain([0, d3.max(data, function (d) { return +d[selectedVar]; })]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));
    const u = svg.selectAll('rect')
      .data(data);
    u
      .enter()
      .append('rect')
      .merge(u)
      .transition()
      .duration(1000)
      .attr('x', function (d) { return x(d.group); })
      .attr('y', function (d) { return y(d[selectedVar]); })
      .attr('width', x.bandwidth())
      .attr('height', function (d) { return height - y(d[selectedVar]); })
      .attr('fill', '#9fa9e9');
  });
}

/* plots the data */
update('var1');

/** This function provides the response to the user pressing submit to the subscription sign-up.
 * A 'thank you' message rises up from the bottom of the page and then disappears after 3 seconds.
 */
function popUp () {
  /* find the div element where the snackbar will be inserted */
  const x = document.getElementById('snackbar');
  x.className = 'show';
  /* sets a timer so that the snackbar only shows for 3 seconds */
  setTimeout(function () { x.className = x.className.replace('show', ''); }, 3000);
}

let id = null;
/** This function produces an animation.
 * I have a cartoon image of a sun moving a small section along the page in response to the user pressing submit to subscibe to the mental health newsletter.
 * The intent is to make the user (target audience teens/students) feel happy about the prospect of working on their mental health.
 */
function myMove () {
  const elem = document.getElementById('sun');
  let pos = 0;
  console.log(window.innerWidth);
  clearInterval(id);
  id = setInterval(frame, 2);
  function frame () {
    if (pos == 200) {
      clearInterval(id);
    } else {
      pos++;
      // elem.style.top = pos + 'px';
      elem.style.left = pos + 'px';
    }
  }
}

/* References available in the README.txt file */
