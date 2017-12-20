import Financials from './financials.js';
import * as d3 from "d3";



document.addEventListener("DOMContentLoaded", () => {


  var simulation = d3.forceSimulation()
      .force("forceX", d3.forceX().strength(0.02).x("900"))
      .force("forceY", d3.forceY().strength(0.05).y("1000"))
      // .force("center", d3.forceCenter().x("650").y("1000"))
      .force("charge", d3.forceManyBody().strength(-10))
      .force("collide", d3.forceCollide().radius(function(d)
          {
            return rscale(d["Market Cap"]) + 0.5;
          }).iterations(5));



  var svg = d3.select("#root")
	.append("svg")
	.attr("width", "1300px")
	.attr("height","2000px");



  var rscale = d3.scaleLinear()
            .domain([1,731])
            .range([10,100]);




  var nodes = svg.selectAll('.circles').data(Financials)
  .enter()
  .append('circle')
  .attr('r', function(d){
    return rscale(d["Market Cap"]);
  })
  .attr('class','circles')
  .attr('stroke', 'black')
  .attr('fill', '#4286f4');

  simulation.nodes(Financials)
  .on("tick", function(d){
    nodes
    .attr("cx", function(e){ return e.x; })
    .attr("cy", function(e){ return e.y; });
  });





  // node = node.sort(function(a,b){ return a.size - b.size; });





});
