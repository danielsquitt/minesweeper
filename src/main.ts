import { IActor } from "./actors/Actor";
import { Layout } from "./actors/Layout";
import { Map } from "./actors/Map";
import { Manager, newMap } from "./state/GameManager";

const def_width = 20;
const def_heigth = 15;
const def_mines = 50

window.onload = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;

  let layout = new Layout(ctx);
  //let map = new Map(layout.mapPos.pos,layout.mapPos.size, { x: 30, y: 20 }, 100);
  //let map = new Map();
  newMap(new Map(layout.mapPos.pos,layout.mapPos.size, { x: def_width, y: def_heigth }, def_mines));


  const actors: Array<IActor> = [layout, Manager.map];


  let lastFrame = 0;
  const render = (time: number) => {
    const delta = (time - lastFrame) / 1000;
    lastFrame = time;
    

    actors.forEach((e) => {
      ctx.save();
      e.draw(delta, ctx);
      ctx.restore();
    });
    window.requestAnimationFrame(render);
  }; 
  window.requestAnimationFrame(render);

  // Mouse over event
  canvas.addEventListener("mousemove", function (e) {
    let cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
    let x = Math.round(e.clientX - cRect.left) * 2;  // Subtract the 'left' of the canvas 
    let y = Math.round(e.clientY - cRect.top) * 2;   // from the X/Y positions to make  
    Manager.map.mouseEvent('over', { x, y })
  });

  // Prevent context menu
  canvas.oncontextmenu = function (e) { e.preventDefault(); e.stopPropagation(); }

  // Mouse down event
  canvas.addEventListener('mousedown', (e) => {
    if (e.button == 0)
    Manager.map.mouseEvent("Leftdown")
    else if (e.button == 2)
    Manager.map.mouseEvent("Rightdown")
  })

  // Mouse up event 
  canvas.addEventListener('mouseup', (e) => {
    if (e.button == 0)
    Manager.map.mouseEvent("Leftup")
    else if (e.button == 2)
    Manager.map.mouseEvent("Rightup")
  })

};

