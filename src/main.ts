import { IActor } from "./types/abstractClass/Actor";
import FPSViewer from "./actors/FPS";
import Map from "./actors/Map";
import ResetButton from "./actors/ResetButton";
import { Manager, newManager } from "./state/GameManager";
import MineCnt from "./actors/MineCnt";
import Timer from "./actors/Timer";
import LevelSelecButton from "./actors/LevelSelecButton";

const def_width = 30;
const def_heigth = 20;
const def_mines = 5;

window.onload = () => {
  // Get canvas elements
  // --------------------------------------------------------------------------
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;

  // Build actors
  // ---------------------------------------------------------------------------
  const FPS = new FPSViewer({ x: 10, y: 50 }, ctx.canvas.height * 0.04);
  const levelButton = new LevelSelecButton({ x: ctx.canvas.width - 200, y: 50 }, ctx.canvas.height * 0.04)

  const mineCnt = new MineCnt(
    { x: ctx.canvas.width * 0.05, y: ctx.canvas.height * 0.10 },
    ctx.canvas.width * 0.05
  );

  const timer = new Timer(
    { x: ctx.canvas.width * 0.95, y: ctx.canvas.height * 0.10 },
    ctx.canvas.width * 0.05
  );

  const resetButton = new ResetButton(
    { x: ctx.canvas.width * 0.475, y: ctx.canvas.height * 0.10 },
    ctx.canvas.width * 0.05,
  );

  // Start manager
  // -----------------------------------------------------------------
  const workspace = {
    pos: {
      x: ctx.canvas.width * 0.05,
      y: ctx.canvas.height * 0.20,
    },
    size: {
      x: ctx.canvas.width * 0.9,
      y: ctx.canvas.height * 0.75,
    },
  };

  newManager(new Map(workspace.pos, workspace.size, { x: def_width, y: def_heigth }, def_mines));

  // Actors Array
  // ---------------------------------------------------------------------------------------------
  const actors: Array<IActor> = [FPS, levelButton, mineCnt, timer, resetButton, Manager.map];

  // Draw bacground
  // ---------------------------------------------------------------
  // Draw backgound rectangle
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.strokeStyle = 'black';
  ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.closePath();
  const clg = ctx.createLinearGradient(0 + 500, 0, ctx.canvas.width - 500, ctx.canvas.height);
  clg.addColorStop(0, '#919FBA');
  clg.addColorStop(0.5, '#D1D7E3');
  clg.addColorStop(1, '#919FBA');
  ctx.fillStyle = clg;
  ctx.fill();
  ctx.stroke();


  let lastFrame = 0;
  const render = (time: number) => {
    const delta = (time - lastFrame) / 1000;
    lastFrame = time;

    actors.forEach((e) => { e.update(delta) });


    // Header rectangle
    ctx.beginPath();
    ctx.lineWidth = 0;
    ctx.rect(10, 10, ctx.canvas.width - 10, ctx.canvas.height * 0.04);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();

    // Draw actors
    actors.forEach((actor) => {
      ctx.save();
      actor.draw(delta, ctx);
      ctx.restore();
    });
    window.requestAnimationFrame(render);
  };
  window.requestAnimationFrame(render);

  // Prevent context menu
  canvas.oncontextmenu = function (e) { e.preventDefault(); e.stopPropagation(); }

  // Mouse over event
  canvas.addEventListener("mousemove", function (e) {
    let cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
    let x = Math.round(e.clientX - cRect.left) * 2;  // Subtract the 'left' of the canvas 
    let y = Math.round(e.clientY - cRect.top) * 2;   // from the X/Y positions to make  
    actors.forEach((e) => {
      e.mouseEvent('over', { x, y })
    });
  });

  // Mouse down event
  canvas.addEventListener('mousedown', (e) => {
    if (e.buttons == 3)
      actors.forEach((e) => {
        e.mouseEvent('Bothdown')
      });
    else if (e.button == 0)
      actors.forEach((e) => {
        e.mouseEvent('Leftdown')
      });
    else if (e.button == 2)
      actors.forEach((e) => {
        e.mouseEvent('Rightdown')
      });
  })

  // Mouse up event 
  canvas.addEventListener('mouseup', (e) => {
    if (e.button == 0)
      actors.forEach((e) => {
        e.mouseEvent('Leftup')
      });
    else if (e.button == 2)
      actors.forEach((e) => {
        e.mouseEvent('Rightup')
      });
  })

};

