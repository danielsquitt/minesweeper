import { IActor } from "./actors/Actor";
import { Map } from "./actors/Map";
import { Tile } from "./actors/Tile";

window.onload = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;

  let map = new Map({ x: ctx.canvas.width , y: ctx.canvas.height }, { x: 15, y: 25 }, 100);

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
};
