import { IActor } from "./actors/Actor";
import { Tile } from "./actors/Tile";

window.onload = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  console.log("Start drawing");
  const tile1 = new Tile({ x: 0, y: 0 }, { x: 200, y: 200 });
  const tile2 = new Tile({ x: 210, y: 0 }, { x: 200, y: 200 });
  tile2.over = true;
  const tile3 = new Tile({ x: 420, y: 0 }, { x: 200, y: 200 });
  tile3.down = true;
  const tile4 = new Tile({ x: 0, y: 210 }, { x: 200, y: 200 });
  tile4.flag = true;
  const tile5 = new Tile({ x: 210, y: 210 }, { x: 200, y: 200 });
  tile5.flag = true;
  tile5.over = true;
  const tile6 = new Tile({ x: 420, y: 210 }, { x: 200, y: 200 });
  tile6.flag = true;
  tile6.down = true;

  const actors: Array<IActor> = [tile1, tile2, tile3, tile4, tile5, tile6];

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
