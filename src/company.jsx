
class Company {
  constructor(mktCap, pb, scale, name, ticker, posX, posY, color = "#66ceff"){
    this.mktCap = mktCap;
    this.pb = pb;
    this.radius = Math.sqrt((scale * 900000)/Math.PI);
    this.innerRadius = Math.sqrt(((scale * 900000) / pb)/Math.PI);
    this.x = posX;
    this.y = posY;
    this.color = color;
  }

  generatePosition(){

  }

  render(){

  }

  draw(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,2.5*Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.fillStyle = "#faff9e";
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.innerRadius,0,2.5*Math.PI);
    ctx.stroke();
    ctx.fill();
  }
}

export default Company;
