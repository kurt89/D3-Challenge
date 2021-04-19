// PLACE YOUR CODE HERE!

function makeGraph() {

let svgWidth = 960;
let svgHeight = 500;

let margin = {
top: 20,
right: 40,
bottom: 80,
left:100
};

let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

// Create the SVG wrapper and append the svg group with size attributes
let svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

let chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Import from data.csv
d3.csv("assets/data/data.csv")
    .then(function(riskData){

//Get data from data.csv file
    riskData.forEach(function(data) {
        data.age = +data.age;
        data.smokes = +data.smokes;
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;
        data.abbr = data.abbr;
        data.income = +data.income;
    });

//Create X and Y scales
    let xLinearScale = d3.scaleLinear()
        .domain([8.5, d3.max(riskData, d => d.poverty)])
        .range([0, width]);

    let yLinearScale = d3.scaleLinear()
        .domain([3.5, d3.max(riskData, d => d.healthcare)])
        .range([height, 0]);

//Build the axis
    let xAxis = d3.axisBottom(xLinearScale);
    let yAxis = d3.axisLeft(yLinearScale);

//Revise the chartGroup axis
    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

    chartGroup.append("g")
    .call(yAxis);
    
//Construct Circles
    let circlesGroup = chartGroup.selectAll("circle")
        .data(riskData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", 10)
        .attr("fill", "lightblue")
        .attr("opacity", ".6")
        .attr("stroke-width", "1")
        .attr("stroke", "black");

        chartGroup.select("g")
        .selectAll("circle")
        .data(riskData)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare))
        .attr("dy",-395)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "black");
     
        console.log(riskData);
        
   
//Place labels on the healthrisk graph
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - 50)
      .attr("x", 0 -250)
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2.5}, ${height + margin.top + 25})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");


});
}

makeGraph();