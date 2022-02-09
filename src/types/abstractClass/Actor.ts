/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import { MouseEvent } from '../Mouse';
import { Point } from '../Point';

export interface IActor {
  position: Point;
  update: (delta: number) => void;
  draw: (delta: number, ctx: CanvasRenderingContext2D) => void;
  mouseEvent: (
    event: MouseEvent,
    position?: Point
  ) => void
}

export default class Actor implements IActor {
  position: Point;
  
  constructor(position: Point) {
    this.position = position;
  }

  update(delta: number){}

  draw(delta: number, ctx: CanvasRenderingContext2D) { }

  mouseEvent(
    event: MouseEvent,
    position?: Point,
  ): void { }
}
