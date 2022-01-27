import { IActor } from "./actors/Actor";
import { Tile } from "./actors/Tile";

window.onload = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

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

  const tile7 = new Tile({ x: 0, y: 420 }, { x: 200, y: 200 });
  tile7.end = true;
  tile7.bomb = true

  const tile8 = new Tile({ x: 210, y: 420 }, { x: 200, y: 200 });
  tile8.end = true;
  tile8.flag = true;

  const tile9 = new Tile({ x: 420, y: 420 }, { x: 200, y: 200 });
  tile9.end = true;
  tile9.bomb = true;
  tile9.flag = true;

  const tile10 = new Tile({ x: 630, y: 420 }, { x: 200, y: 200 });
  tile10.discovered = true;
  tile10.bomb = true;

  const tile11 = new Tile({ x: 0, y: 630 }, { x: 200, y: 200 });
  tile11.discovered = true;

  const tile12 = new Tile({ x: 210, y: 630 }, { x: 200, y: 200 });
  tile12.discovered = true;
  tile12.number = 1;

  const tile13 = new Tile({ x: 420, y: 630 }, { x: 200, y: 200 });
  tile13.discovered = true;
  tile13.number = 2;

  const tile14 = new Tile({ x: 630, y: 630 }, { x: 200, y: 200 });
  tile14.discovered = true;
  tile14.number = 3;

  const tile15 = new Tile({ x: 840, y: 630 }, { x: 200, y: 200 });
  tile15.discovered = true;
  tile15.number = 4;

  const tile16 = new Tile({ x: 0, y: 840 }, { x: 200, y: 200 });
  tile16.discovered = true;
  tile16.number = 5;

  const tile17 = new Tile({ x: 210, y: 840 }, { x: 200, y: 200 });
  tile17.discovered = true;
  tile17.number = 6;

  const tile18 = new Tile({ x: 420, y: 840 }, { x: 200, y: 200 });
  tile18.discovered = true;
  tile18.number = 7;

  const tile19 = new Tile({ x: 630, y: 840 }, { x: 200, y: 200 });
  tile19.discovered = true;
  tile19.number = 8;




  const actors: Array<IActor> = [tile1, tile2, tile3, tile4, 
    tile5, tile6, tile7, tile8, tile9, tile10, tile11, tile12,
    tile13, tile14, tile15, tile16, tile17, tile18, tile19
  ];

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
