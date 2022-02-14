/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import { MouseEvent } from '../Mouse';
import { Point } from '../Point';

export interface IActor {
  update: (delta: number) => void;
  draw: (delta: number, ctx: CanvasRenderingContext2D) => void;
  mouseEvent: (
    event: MouseEvent,
    position?: Point
  ) => void
}

export default class Actor implements IActor {
  position: Point;
  size: Point;
  constructor(position: Point, size: Point) {
    this.position = position;
    this.size = size;
  }

  update(delta: number) {}

  draw(delta: number, ctx: CanvasRenderingContext2D) { }

  mouseEvent(
    event: MouseEvent,
    position?: Point,
  ): void { }
}
