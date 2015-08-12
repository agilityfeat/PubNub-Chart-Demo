// Setting up base bar chart
var margin = {top: 20, right: 20, bottom: 30, left: 40};
var width = window.innerWidth - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom');

var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')
    .ticks(10, '');

var svg = d3.select('body').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var data = [];

var names = ['Alice', 'Bob', 'Charlie', 'Doris', 'Eve', 'Frank', 'Gloria', 'Harry', 'Igor', 'Jon'];
while(names.length > 0){
  data.push({
    'name': names.splice(Math.floor(Math.random() * names.length),1)[0],
    'value': 0
  });
}

x.domain(data.map(function(d) { return d.name; }));
y.domain([0, 100]);

svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis)
  .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '.71em')
    .style('text-anchor', 'end')
    .text('Value');
    
function updateChart(){
  var bar = svg.selectAll('.bar')
      .data(data);

  // new data:
  bar.enter().append('rect')
     .attr('class', 'bar')
     .attr('x', function(d) { return x(d.name); })
     .attr('y', function(d) { return y(d.value) - 1; })
     .attr('height', function(d) { return height - y(d.value) + 1; })
     .attr('width', x.rangeBand());

  // removed data:
  bar.exit().remove();

  // updated data:
  bar.transition()
     .duration(750)
        .attr('y', function(d) { return y(d.value) - 1; })
        .attr('height', function(d) { return height - y(d.value) + 1; });

  svg.select('.x.axis') // change the x axis
     .transition()
     .duration(750)
     .call(xAxis);

  svg.select('.y.axis') // change the y axis
     .transition()
     .duration(750)
     .call(yAxis);
}

function updateData(user_data) {
  data = user_data.sort(function(a,b){ return a.value - b.value;});

  // Scale the range of the data again 
  x.domain(data.map(function(d) { return d.name; }));
  updateChart();
}

updateChart();