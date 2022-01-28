import { IActor } from "./actors/Actor";
import { Map } from "./actors/Map";

window.onload = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;

  let map = new Map({ x: ctx.canvas.width, y: ctx.canvas.height }, { x: 10, y: 10 }, 20);

  const actors: Array<IActor> = [map];

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
    map.mouseEvent('over', { x, y })
  });

  // Prevent context menu
  canvas.oncontextmenu = function(e) { e.preventDefault(); e.stopPropagation(); }

  // Mouse down event
  canvas.addEventListener('mousedown', (e) => {
    if (e.button == 0)
      map.mouseEvent("Leftdown")
    else if (e.button == 2)
      map.mouseEvent("Rightdown")
  })

  // Mouse up event 
  canvas.addEventListener('mouseup', (e) => {
    if (e.button == 0)
      map.mouseEvent("Leftup")
    else if (e.button == 2)
      map.mouseEvent("Rightup")
  })

};

