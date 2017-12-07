import Financials from './financials.js';
import Board from './db_viz.jsx';



document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = "1324";
  canvasEl.height = "1500";
  const ctx = canvasEl.getContext("2d");
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  // ctx.fillStyle = "#f4b042";
  // ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  const board = new Board(Financials,ctx,canvasEl);
  board.render();

});
