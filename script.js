
document.getElementById('submitBtn').addEventListener('click', thankYouMsg)
/** Function produces a 'thank you' message in response to the user clicking Submit after filling out their contact details. */
function thankYouMsg () {
  document.getElementById('tests').innerHTML = 'Thank you for signing up! :)'
}

document.getElementById('emailMsg').addEventListener('click', emailAlert)
/** Displays alert to user when they click to put in their email address. */
function emailAlert () {
  alert('We promise to only send you helpful and relevant information.')
}

// set the dimensions and margins of the graph
const margin = { top: 30, right: 30, bottom: 70, left: 60 }
const width = 460 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom

// append the svg object to the body of the page
const svg = d3.select('#my_dataviz')
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
  d3.csv('dataset_final.csv', function (data) {
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
      .attr('fill', '#69b3a2')
  })
}

// Initialize plot
update('var1')
