import Financials from './financials.js';
import * as d3 from "d3";


document.addEventListener("DOMContentLoaded", () => {

  let maxBook;
  let minBook;
  let companyRadius = {};


  function maxMinAssign(){
  for (var i = 0; i < Financials.length; i++) {
    let company = Financials[i];
    let bookVal = company["Market Cap"] / company["Price/Book"];
    companyRadius[company["Symbol"]] = bookVal === Infinity ? 10 : bookVal;
    if (maxBook === undefined && minBook === undefined) {
      maxBook = bookVal;
      minBook = bookVal;
    } else if ( maxBook < bookVal && bookVal !== Infinity) {
      maxBook = bookVal;
    } else if ( minBook > bookVal) {
      minBook = bookVal;
    }
  }
}

maxMinAssign();

var rscale = d3.scaleLinear()
          .domain([minBook,731])
          .range([10,350]);


  var simulation = d3.forceSimulation(Financials)
      .force("forceX", d3.forceX().strength(0.03).x("1000"))
      .force("forceY", d3.forceY().strength(0.06).y("1000"))
      .force("center", d3.forceCenter().x("900").y("1000"))
      .force("charge", d3.forceManyBody().strength(-10))
      .force("collide", d3.forceCollide().radius(function(d)
          {
            return rscale(companyRadius[d["Symbol"]]) + 2;
          }).iterations(5))
      .on("tick", function(d){
          nodes
          .attr("cx", function(e){ return e.x; })
          .attr("cy", function(e){ return e.y; });
        });



  var svg = d3.select("#root")
	.append("svg")
	.attr("width", "2000px")
	.attr("height","2000px");







  var nodes = svg.selectAll('.circle')
  .data(Financials)
  .enter()
  .append("g")
  .append('circle')
  .attr('r', function(d){
    return rscale(companyRadius[d["Symbol"]]);
  })
  .attr('class','circles')
  .attr('stroke', 'black')
  .attr('fill', '#4286f4')
  .on("click", handleClick);


  simulation.nodes(Financials).restart();


  var grouping = svg.selectAll('g');



  let selected;





  function handleClick(d, i) {

    if (selected) {
      let normalize = handleRegular.bind(selected.scope);
      normalize(selected.d,selected.i);
    }


    if (!!selected && selected.scope === this) {
      selected = null;
    } else {
    selected = {scope: this, d, i};

    d3.select(this)
        	  .transition()
        	  .duration(1000)
            .tween('radius', function(datum) {
          	   var int = d3.interpolate(d.radius, rscale(datum["Market Cap"]));
               var that = this;
          	    return function(t) {
                  d.radius = int(t);
                  companyRadius[datum["Symbol"]] = datum["Market Cap"];
                  simulation.nodes(Financials);
                  simulation.restart();


            };
        	 })
        	  .attr('r', function(data) {
              return rscale(data["Market Cap"]);
            })
            .attr('fill', 'orange');

          }

          // window.setTimeout(() => {
          //   simulation.nodes(Financials);
          //   simulation.alpha(1).restart();
          // }, 1500);

    }


   function handleRegular(d, i) {

     let bookVal = d["Market Cap"] / d["Price/Book"] === Infinity ? 10 : d["Market Cap"] / d["Price/Book"] ;

     console.log(companyRadius[d["Symbol"]]);

     d3.select(this)
     .transition()
     .duration(1000)
     .tween('radius', function(datum) {
        var int = d3.interpolate(d.radius, rscale(bookVal));
         return function(t) {
           d.radius = int(t);
           companyRadius[d["Symbol"]] = bookVal;
           simulation.nodes(Financials);
           simulation.alpha(1).restart();
     };
    })
     .attr('r', function(data) {
       return rscale(bookVal);
     })
     .attr('fill', '#4286f4');
     console.log(companyRadius[d["Symbol"]]);
  }


  // node = node.sort(function(a,b){ return a.size - b.size; });

});
