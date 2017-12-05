import Financials from './financials.js';
import Board from './db_viz.jsx';



document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = window.innerWidth;
  canvasEl.height = window.innerHeight;
  const ctx = canvasEl.getContext("2d");
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  // ctx.fillStyle = "#f4b042";
  // ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  const board = new Board(Financials);
  board.render(ctx);

});
