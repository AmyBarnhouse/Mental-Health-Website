/* global d3 */
/* global currentOpacity */

document.getElementById('colourBackStigma').addEventListener('mouseover', function () {
  document.getElementById('colourBackStigma').style.backgroundColor = '#f8ebfa'
})

document.getElementById('colourBackIntro').addEventListener('mouseover', function () {
  document.getElementById('colourBackIntro').style.backgroundColor = '#f8ebfa'
})

document.getElementById('colourBackTrend').addEventListener('mouseover', function () {
  document.getElementById('colourBackTrend').style.backgroundColor = '#f8ebfa'
})

document.getElementById('colourBackStigma').addEventListener('mouseout', function () {
  document.getElementById('colourBackStigma').style.backgroundColor = '#fff'
})

document.getElementById('colourBackIntro').addEventListener('mouseout', function () {
  document.getElementById('colourBackIntro').style.backgroundColor = '#fff'
})

document.getElementById('colourBackTrend').addEventListener('mouseout', function () {
  document.getElementById('colourBackTrend').style.backgroundColor = '#fff'
})

document.getElementById('colourBackScatter').addEventListener('mouseover', function () {
  document.getElementById('colourBackScatter').style.backgroundColor = '#f8ebfa'
})

document.getElementById('colourBackScatter').addEventListener('mouseout', function () {
  document.getElementById('colourBackScatter').style.backgroundColor = '#fff'
})

document.getElementById('emailMsg').addEventListener('click', emailAlert)
/** Displays alert to user when they click to put in their email address. */
function emailAlert () {
  alert('We promise to only send you helpful and relevant information.')
}

// set the dimensions and margins of the graph
const margin1 = { top: 30, right: 500, bottom: 30, left: 30 }
const width1 = 500 - margin1.left - margin1.right
const height1 = 400 - margin1.top - margin1.bottom

// append the svg object to the body of the page
const svg1 = d3.select('#my_dataviz')
  .append('svg')
  .attr('width', width1 + margin1.left + margin1.right)
  .attr('height', height1 + margin1.top + margin1.bottom)
  .append('g')
  .attr('transform',
    'translate(' + margin1.left + ',' + margin1.top + ')')

// Read the data
d3.csv('scatterDataset.csv', function (data1) {
  // List of groups (here I have one group per column)
  const allGroup = ['Insomnia', 'Anxiety', 'Depression']

  // Reformat the data: we need an array of arrays of {x, y} tuples
  const dataReady = allGroup.map(function (grpName) { // .map allows to do something for each element of the list
    return {
      name: grpName,
      values: data1.map(function (d) {
        return { Age: d.Age, value: +d[grpName] }
      })
    }
  })
  // I strongly advise to have a look to dataReady with
  console.log(dataReady)
  // A color scale: one color for each group
  const myColor = d3.scaleOrdinal()
    .domain(allGroup)
    .range(d3.schemeSet2)

  // Add X axis --> it is a date format
  const x = d3.scaleLinear()
    .domain([18, 24])
    .range([0, width])
  svg1.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x))

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0])
  svg1.append('g')
    .call(d3.axisLeft(y))
  // Add the lines
  const line = d3.line()
    .x(function (d) { return x(+d.Age) })
    .y(function (d) { return y(+d.value) })
  svg1.selectAll('myLines')
    .data(dataReady)
    .enter()
    .append('path')
    .attr('class', function (d) { return d.name })
    .attr('d', function (d) { return line(d.values) })
    .attr('stroke', function (d) { return myColor(d.name) })
    .style('stroke-width', 4)
    .style('fill', 'none')
  // Add the points
  svg1
  // First we need to enter in a group
    .selectAll('myDots')
    .data(dataReady)
    .enter()
    .append('g')
    .style('fill', function (d) { return myColor(d.name) })
    .attr('class', function (d) { return d.name })
  // Second we need to enter in the 'values' part of this group
    .selectAll('myPoints')
    .data(function (d) { return d.values })
    .enter()
    .append('circle')
    .attr('cx', function (d) { return x(d.Age) })
    .attr('cy', function (d) { return y(d.value) })
    .attr('r', 5)
    .attr('stroke', 'white')
  // Add a label at the end of each line
  svg1
    .selectAll('myLabels')
    .data(dataReady)
    .enter()
    .append('g')
    .append('text')
    .attr('class', function (d) { return d.name })
    .datum(function (d) { return { name: d.name, value: d.values[d.values.length - 1] } }) // keep only the last value of each time series
    .attr('transform', function (d) { return 'translate(' + x(d.value.Age) + ',' + y(d.value.value) + ')' }) // Put the text at the position of the last point
    .attr('x', 12) // shift the text a bit more right
    .text(function (d) { return d.name })
    .style('fill', function (d) { return myColor(d.name) })
    .style('font-size', 15)
  // Add a legend (interactive)
  svg1
    .selectAll('myLegend')
    .data(dataReady)
    .enter()
    .append('g')
    .append('text')
    .attr('x', function (d, i) { return 30 + i * 80 })
    .attr('y', 30)
    .text(function (d) { return d.name })
    .style('fill', function (d) { return myColor(d.name) })
    .style('font-size', 15)
    .on('click', function (d) {
      // is the element currently visible ?
      currentOpacity = d3.selectAll('.' + d.name).style('opacity')
      // Change the opacity: from 0 to 1 or from 1 to 0
      d3.selectAll('.' + d.name).transition().style('opacity', currentOpacity == 1 ? 0 : 1)
    })
})

// set the dimensions and margins of the graph
const margin = { top: 30, right: 30, bottom: 70, left: 60 }
const width = 460 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom

// append the svg object to the body of the page
const svg = d3.select('#barChartVisual')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform',
    'translate(' + margin.left + ',' + margin.top + ')')

// Initialize the X axis
const x = d3.scaleBand()
  .range([0, width])
  .padding(0.2)
const xAxis = svg.append('g')
  .attr('transform', 'translate(0,' + height + ')')

// Initialize the Y axis
const y = d3.scaleLinear()
  .range([height, 0])
const yAxis = svg.append('g')
  .attr('class', 'myYaxis')

/** This function imports the dataset and presents it in a bar chart.  */
function update (selectedVar) {
  // Parse the Data
  d3.csv('barChartDataset.csv', function (data) {
    // X axis
    x.domain(data.map(function (d) { return d.group }))
    xAxis.transition().duration(1000).call(d3.axisBottom(x))

    // Add Y axis
    y.domain([0, d3.max(data, function (d) { return +d[selectedVar] })])
    yAxis.transition().duration(1000).call(d3.axisLeft(y))

    // variable u: map data to existing bars
    const u = svg.selectAll('rect')
      .data(data)
    // update bars
    u
      .enter()
      .append('rect')
      .merge(u)
      .transition()
      .duration(1000)
      .attr('x', function (d) { return x(d.group) })
      .attr('y', function (d) { return y(d[selectedVar]) })
      .attr('width', x.bandwidth())
      .attr('height', function (d) { return height - y(d[selectedVar]) })
      .attr('fill', '#9fa9e9')
  })
}

// Initialize plot
update('var1')

function popUp () {
  // Get the snackbar DIV
  const x = document.getElementById('snackbar')

  // Add the "show" class to DIV
  x.className = 'show'

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () { x.className = x.className.replace('show', '') }, 3000)
}

let id = null
function myMove () {
  const elem = document.getElementById('sun')
  let pos = 0
  clearInterval(id)
  id = setInterval(frame, 2)
  function frame () {
    if (pos == 1000) {
      clearInterval(id)
    } else {
      pos++
      // elem.style.top = pos + 'px';
      elem.style.left = pos + 'px'
    }
  }
}
