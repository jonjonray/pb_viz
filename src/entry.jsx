import Financials from './financials.js';

document.addEventListener("DOMContentLoaded", () => {


  const canvasEl = document.getElementsByTagName("canvas")[0];




const draw = () =>  {
    const ctx = canvasEl.getContext("2d");
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillStyle = "#f4b042";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  };

  const totalMktCap = (financials) => {
    let result = 0;
    financials.forEach(company => {
      result += Math.floor(company["Market Cap"]);
    });
    return result;
  };

  draw();


  console.log(canvasEl);
  console.log(window.innerWidth);
  console.log("I AM WORKING");
  console.log(totalMktCap(Financials));
});
