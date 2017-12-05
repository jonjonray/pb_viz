import Company from './company.jsx';

class Board {
  constructor(financials){
    this.financials = financials;
    this.test = new Company(500,3, 500/this.totalMktCap(this.financials), "test","tst",  200, 150);
  }

  totalMktCap(financials) {
    let result = 0;
    financials.forEach(company => {
      result += Math.floor(company["Market Cap"]);
    });
    return result;
  }



  render(ctx){
    document.addEventListener("onmousemove", this.handleMouseOver);
    this.test.draw(ctx);
  }
}

export default Board;
