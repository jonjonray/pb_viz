import Company from './company.jsx';

class Board {
  constructor(financials,ctx,canvas){
    this.financials = financials;
    this.totalMktCap = this.totalMarketCap(this.financials);
    this.test = new Company(500,3, 500/this.totalMktCap, "test","tst",  200, 150);
    document.addEventListener("mousemove", e => this.handleMouseOver(e,ctx));
    this.ctx = ctx;
    this.canvas = canvas;
    this.companies = [];
    this.positions = [];
    this.createCompanies();
    this.isColliding = this.isColliding.bind(this);
    this.generatePosition = this.generatePosition.bind(this);
  }

  createCompanies(){
    this.financials.forEach(company => {
      let pos = this.generatePosition(company);
      this.companies.push(new Company(
        company["Market Cap"],
        company["Price/Book"],
        company["Market Cap"]/this.totalMktCap,
        company["Name"],
        company["Symbol"],
        pos[0],
        pos[1]));
    });
  }

  generatePosition(company){
    let pos = [Math.round((Math.random() * (this.canvas.width - 30))),
              Math.round((Math.random() * (this.canvas.height - 30)))];
    while (this.isColliding(pos,company)) {
      pos = [(Math.random() * this.canvas.width),
                (Math.random() * this.canvas.height)];
    }

    return pos;
  }

  isColliding(pos,companyFin){
    let radius = Math.sqrt(((companyFin["Market Cap"]/this.totalMktCap) * 400000)/Math.PI);

    let result = false;
    this.companies.forEach(company => {
      if (Math.abs(pos[0] - company.x ) + (Math.abs(pos[1] - company.y ))
                      <= radius + company.radius) {
          result = true;
      } else if ( Math.abs(0 - pos[0]) <= radius || Math.abs(0 - pos[1]) <= radius ){
        result = true;
      } else if (Math.abs(this.canvas.width - pos[0]) <= radius ||
        Math.abs(this.canvas.height - pos[1]) <= radius){
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

  handleMouseOver(e,ctx){
    this.companies.forEach((company) => {
      if (Math.abs(e.clientX - company.x) <= company.radius &&
          Math.abs(e.clientY - company.y) <= company.radius) {
        company.hover = true;
        this.render(ctx);
      } else {
        company.hover = false;
      }
    });
  }

  render(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.companies.forEach(company => {
      company.draw(this.ctx);
    });

  }
}

export default Board;
