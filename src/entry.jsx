import Financials from './financials.js';
import * as d3 from "d3";
import d3Tip from "d3-tip";
d3.tip = d3Tip;

document.addEventListener("DOMContentLoaded", () => {

  let maxBook;
  let minBook;
  let companyRadius = {};
  let width = window.innerWidth;

  const COMPANY_COLOR_KEY = {
     "Industrials": "red",
     "Health Care": "blue",
     "Information Technology": "#ff9d00",
     "Consumer Discretionary": "yellow",
     "Utilities": "pink",
     "Financials": "#ff6b6b",
     "Materials": "brown",
     "Consumer Staples": "black",
     "Real Estate": "#7aadff",
     "Energy": "#2df4ff",
     "Telecommunications Services": "#7228fc"
  };

  function initialize(){
    for (var i = 0; i < Financials.length; i++) {
      let company = Financials[i];
      let bookVal = company["Market Cap"] / company["Price/Book"] === Infinity
                    ? 10 : company["Market Cap"] / company["Price/Book"];
      companyRadius[company["Symbol"]] = { radius: bookVal, color: COMPANY_COLOR_KEY[company["Sector"]] };
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

initialize();

  var ul = d3.select(".key").append("ul");

   ul.selectAll('li')
      .data(Object.keys(COMPANY_COLOR_KEY))
      .enter()
      .append('li')
      .html(String)
      .append('div')
      .style('width', '20px')
      .style('height', '20px')
      .style('background-color', d => {

      return `${COMPANY_COLOR_KEY[d]}`;

    });



var rscale = d3.scaleLinear()
          .domain([minBook,731])
          .range([10,350]);


  var simulation = d3.forceSimulation(Financials)
      .force("forceX", d3.forceX().strength(0.02).x(width/2))
      .force("forceY", d3.forceY().strength(0.04).y("600"))
      .force("center", d3.forceCenter().x("1000").y("600"))
      .force("charge", d3.forceManyBody().strength(-10))
      .force("collide", d3.forceCollide().radius(function(d)
          {
            return rscale(companyRadius[d["Symbol"]]["radius"]) + 2;
          }).iterations(5))
      .on("tick", function(d){
          nodes
          .attr("cx", function(e){ return e.x; })
          .attr("cy", function(e){ return e.y; });
        });



  var svg = d3.select("#root")
	    .append("svg")
	    .attr("width", "80%")
	    .attr("height","1200px");



      let tip = d3.tip()
                  .attr('class', 'd3-tip')
                  .direction('n')
                  .offset([-5,0])
                  .html(function(d) {
        return `<span class='tool-tip'><ul>
        <li>Company: ${d["Name"]} (${d["Symbol"]}) </li>
        <li>Market Cap: ${d["Market Cap"]} </li>
        <li>P/B: ${d["Price/Book"]} </li>
        <li>Sector: ${d["Sector"]} </li>
        </ul>
      </span>`;
      });

    svg.call(tip);


  var nodes = svg.selectAll('.circles')
      .data(Financials)
      .enter()
      .append("g")
      .append('circle')
      .attr('r', function(d){
        return rscale(companyRadius[d["Symbol"]]["radius"]);
      })
      .attr('class','circles')
      .attr('stroke', 'black')
      .attr('fill', (d) => {
        return companyRadius[d["Symbol"]]["color"];
      })
      .on("click", handleClick)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);


  simulation.nodes(Financials).restart();



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
        	  .duration(800)
            .tween('radius', function(data) {
          	   var int = d3.interpolate(d.radius, rscale(data["Market Cap"]));
               var that = this;
          	    return function(t) {
                  d.radius = int(t);
                  companyRadius[data["Symbol"]]["radius"] = data["Market Cap"];
                  simulation.nodes(Financials);
                  simulation.restart();


            };
        	 })
        	  .attr('r', function(data) {
              return rscale(data["Market Cap"]);
            })
            .attr('fill', '#00ff50')
            .attr('stroke', '#424242')
            .attr('stroke-width', '5px');

          }


    }


   function handleRegular(d, i) {

     let bookVal = d["Market Cap"] / d["Price/Book"] === Infinity ? 10 : d["Market Cap"] / d["Price/Book"] ;



     d3.select(this)
            .transition()
            .duration(1000)
             .tween('radius', function(datum) {
                var int = d3.interpolate(d.radius, rscale(bookVal));
                 return function(t) {
                   d.radius = int(t);
                   companyRadius[d["Symbol"]]["radius"] = bookVal;
                   simulation.nodes(Financials);
                   simulation.alpha(1).restart();
             };
            })
             .attr('r', function(data) {
               return rscale(bookVal);
             })
             .attr('fill', (data) => {
               return companyRadius[d["Symbol"]]["color"];
             })
             .attr('stroke', 'black')
             .attr('stroke-width', "1px");

          }


  // node = node.sort(function(a,b){ return a.size - b.size; });

});
