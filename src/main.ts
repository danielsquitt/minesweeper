import { IActor } from "./actors/Actor";
import Layout from "./actors/Layout";
import Map from "./actors/Map";
import { Manager, newManager } from "./state/GameManager";

const def_width = 30;
const def_heigth = 20;
const def_mines = 50;

window.onload = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;

  let layout = new Layout(ctx);
  newManager(new Map(layout.mapPos.pos, layout.mapPos.size, { x: def_width, y: def_heigth }, def_mines));

  const actors: Array<IActor> = [layout, Manager];

  let lastFrame = 0;
  const render = (time: number) => {
    const delta = (time - lastFrame) / 1000;
    lastFrame = time;

    actors.forEach((e) => { e.update(delta) });

    actors.forEach((e) => {
      ctx.save();
      e.draw(delta, ctx);
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

