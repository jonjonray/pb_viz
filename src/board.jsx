import React from 'react';
import Company from './company_circle.jsx';

class Board extends React.Component {
  constructor(props){
    super(props);
    this.companies = [];
    this.totalMktCap = this.totalMarketCap(this.props.financials);
    this.createCompanies = this.createCompanies.bind(this);
    this.innerCircles = [];
    this.createCompanies();
    console.log(this.companies);
  }

  createCompanies(){
    this.props.financials.forEach(company => {
      let pos = this.generatePosition(company);
      debugger;
      this.companies.push({
        x: pos[0],
        y: pos[1],
        scale: company["Market Cap"]/this.totalMktCap,
        pb: company["Price/Book"]});
    });
  }

  generatePosition(company){
    let pos = [((Math.random() * 1300)),
              (Math.random() * 1500)];

    while (this.isColliding(pos,company)) {
      pos = [(Math.random() * window.width),
                (Math.random() * 1500)];
    }

    return pos;
  }

  isColliding(pos,companyFin){
    let radius = Math.sqrt(((companyFin["Market Cap"]/this.totalMktCap) * 400000)/Math.PI);

    let result = false;
    this.companies.forEach(company => {
      if (Math.abs(pos[0] - company.x ) + (Math.abs(pos[1] - company.y ))
                      <= radius + (Math.sqrt((company.scale * 400000)/Math.PI))) {
          result = true;
      } else if ( Math.abs(0 - pos[0]) <= radius || Math.abs(0 - pos[1]) <= radius ){
        result = true;
      } else if (Math.abs(window.width - pos[0]) <= radius ||
        Math.abs(1500 - pos[1]) <= radius){
          result = true;
        }
    });
    return result;
  }

  totalMarketCap(financials) {
    let result = 0;
    financials.forEach(company => {
      result += Math.floor(company["Market Cap"]);
    });
    return result;
  }

  render(){
    return (
      <svg>
        {
          this.companies.map(company => (
            <Company x={company.x}
              y={company.y}
              scale={company.scale}
              pb={company.pb} />
          ))
        }
      </svg>
    );
  }
}

export default Board;
