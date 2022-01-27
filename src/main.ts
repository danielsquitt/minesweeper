import { IActor } from "./actors/Actor";
import { Map } from "./actors/Map";
import { Tile } from "./actors/Tile";

window.onload = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const actors: Array<IActor> = [];


  let map = new Map({ x: 100, y: 100 }, { x: 10, y: 10 }, 35);


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
