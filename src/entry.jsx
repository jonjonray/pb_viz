import Financials from './financials.js';
import * as d3 from "d3";



document.addEventListener("DOMContentLoaded", () => {
  // const canvasEl = document.getElementsByTagName("canvas")[0];
  // canvasEl.width = "1324";
  // canvasEl.height = "1500";
  // const ctx = canvasEl.getContext("2d");
  // ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  // // ctx.fillStyle = "#f4b042";
  // // ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  //
  // const board = new Board(Financials,ctx,canvasEl);

  var simulation = d3.forceSimulation()
      .force("forceX", d3.forceX().strength(.05).x("650"))
      .force("forceY", d3.forceY().strength(.05).y("650"))
      .force("center", d3.forceCenter().x("650").y("650"))
      .force("charge", d3.forceManyBody().strength(-40))
      .force("collide", d3.forceCollide().radius(function(d) { return d.r; }).iterations(0));



  var svg = d3.select("#root")
	.append("svg")
	.attr("width", "1300px")
	.attr("height","1300px");



  var rscale = d3.scaleLinear()
            .domain([1,731])
            .range([10,70]);




  var node = svg.selectAll('.circles').data(Financials)
  .enter()
  .append('circle')
  .attr('r', function(d){
    return rscale(d["Market Cap"]);
  })
  .attr('class','circles')
  .attr('stroke', 'black')
  .attr('fill', 'white');



  // node = node.sort(function(a,b){ return a.size - b.size; });

  simulation.nodes(Financials)
        .on("tick", function(d){
            node
                .attr("cx", function(e){ return e.x; })
                .attr("cy", function(e){ return e.y; });
          });



});
