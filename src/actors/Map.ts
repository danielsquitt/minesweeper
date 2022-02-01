import _, { map, max, min } from "lodash";
import { Point, typeOfPoint } from "../types/Point";
import { Actor } from "./Actor";
import { Tile } from "./Tile";
import {
  array2dIterator,
  array2dNew,
  array2dSurroundIterator,
} from "../utils/ArrayIterators";

export class Map extends Actor {
  size: Point; // Size in number of tilles of map
  sizePxCell: Point; // Size in pixels of cell
  m: number;
  map: Array<Array<Tile>>;
  mouse: {
    leftDown: boolean;
    rightDown: boolean;
  };

  constructor(sizePx: Point, sizeN: Point, m: number) {
    if (m / (sizeN.x * sizeN.y) > 0.3)
      throw new Error(
        `Error: Bomb density ${m / (sizeN.x * sizeN.y)} is bigger than ${0.3}`
      );
    super({ x: 0, y: 0 });
    this.size = sizeN;
    const cellSize = Math.min(
      Math.floor(sizePx.x / sizeN.x),
      Math.floor(sizePx.y / sizeN.y)
    );
    this.sizePxCell = { x: cellSize, y: cellSize };
    this.m = m;
    this.mouse = { leftDown: false, rightDown: false };

    this.map = Map.generateMap(
      this.size.x,
      this.size.y,
      this.m,
      this.sizePxCell
    );
  }
  // Generates a map. -1 Mine, 0,...8 No mine
  static generateMap(
    w: number,
    h: number,
    m: number,
    cellSize: Point
  ): Array<Array<Tile>> {
    // Generate an empty map
    const map: Array<Array<Tile>> = array2dNew<Tile>(h, w);
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        const pos: Point = { x: cellSize.x * i, y: cellSize.y * j };
        map[i][j] = new Tile(pos, cellSize, array2dSurroundIterator(map, i, j));
      }
    }

    // Set bombs
    for (let i = 0; i < m; i++) {
      while (true) {
        const h_ = _.random(0, h - 1);
        const w_ = _.random(0, w - 1);
        if (!map[h_][w_].bomb) {
          // setBomb(map, h_, w_)
          for (const cell of array2dSurroundIterator<Tile>(map, h_, w_)) {
            cell.increaseNumber();
          }
          map[h_][w_].setBomb();
          break;
        }
      }
    }
    console.log(map);
    return map;
  }

  // Draw
  draw(delta: number, ctx: CanvasRenderingContext2D) {
    for (const cell of array2dIterator(this.map)) {
      ctx.save();
      cell.draw(delta, ctx);
      ctx.restore();
    }
  }

  // Mouse event
  mouseEvent(
    event: "over" | "Leftdown" | "Rightdown" | "Leftup" | "Rightup" | "Bothdown",
    position?: Point
  ): void {
    // Event over
    if (event === "over" && typeOfPoint(position)) {
      const pos = position as Point;
      for (const cell of array2dIterator(this.map)) {
        const over =
          pos.x >= cell.position.x &&
          pos.x <= cell.position.x + cell.size.x &&
          pos.y >= cell.position.y &&
          pos.y <= cell.position.y + cell.size.y;
        cell.setOver(over, this.mouse.leftDown || this.mouse.rightDown);
      }
      // Event mouse left down
    } else if (event === "Leftdown") {
      this.mouse.leftDown = true;
      for (const cell of array2dIterator(this.map)) {
        cell.setDownLeft(true);
      }
    } else if (event === "Leftup") {
      this.mouse.leftDown = false;
      for (const cell of array2dIterator(this.map)) {
        cell.setDownLeft(false);
      }
    } else if (event === "Rightdown") {
      this.mouse.rightDown = true;
      for (const cell of array2dIterator(this.map)) {
        cell.setDownRigth(true);
      }
    } else if (event === "Rightup") {
      this.mouse.rightDown = false;
      for (const cell of array2dIterator(this.map)) {
        cell.setDownRigth(false);
      }
    }
  }
}
