
class Company {
  constructor(mktCap, pb, scale, name, ticker, posX, posY, hover = false){
    this.mktCap = mktCap;
    this.pb = pb;
    this.name = name;
    this.ticker = ticker;
    this.radius = Math.sqrt((scale * 400000)/Math.PI);
    this.innerRadius = Math.sqrt(((scale * 400000) / pb)/Math.PI);
    this.x = posX;
    this.y = posY;
    this.hover = hover;
  }

  draw(ctx){
    if (this.hover) {

      ctx.strokeStyle = "black";
      ctx.fillStyle = "white";
      ctx.rect(this.x + this.radius + 5 ,this.y + this.radius + 5, 250, 250);
      ctx.stroke();
      ctx.fill();
      ctx.font = "15px Arial";
      ctx.fillStyle = "black";
      ctx.fillText(`Company:  ${this.name}(${this.ticker})`,this.x + this.radius + 10 ,this.y + this.radius + 20);
      ctx.fillText(`Market Value:  $${this.mktCap} billion`,this.x + this.radius + 10 ,this.y + this.radius + 45);
      ctx.fillText(`Book Value:  $${Math.floor(this.mktCap/this.pb)} billion`,this.x + this.radius + 10 ,this.y + this.radius + 70);
      ctx.fillText(`Price/Book:  ${this.pb}`,this.x + this.radius + 10 ,this.y + this.radius + 95);

      ctx.fillStyle = "#3fc2ff";
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.radius,0,2.5*Math.PI);
      ctx.stroke();
      ctx.fill();

      ctx.fillStyle = "#f7ff68";
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.innerRadius,0,2.5*Math.PI);
      ctx.stroke();
      ctx.fill();

    } else {
      ctx.fillStyle = "#66ceff";
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
}

export default Company;
