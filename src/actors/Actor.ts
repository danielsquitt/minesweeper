/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { Point } from "../types/Point";

export interface IActor {
    position: Point;
    update: (delta: number) => void;
    draw: (delta: number, ctx: CanvasRenderingContext2D) => void;
}

export class Actor implements IActor {
  position: Point;

  constructor(position: Point) {
    this.position = position;
  }

  update(delta: number) { }

  draw(delta: number, ctx: CanvasRenderingContext2D) { }
}
