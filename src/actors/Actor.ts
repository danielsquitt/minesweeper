/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import { Point } from '../types/Point';

export interface IActor {
  position: Point;
  update: (delta: number) => void;
  draw: (delta: number, ctx: CanvasRenderingContext2D) => void;
  mouseEvent: (
    event: 'over' | 'Leftdown' | 'Rightdown' | 'Leftup' | 'Rightup' | 'Bothdown',
    position?: Point
  ) => void
}

export default class Actor implements IActor {
  position: Point;

  constructor(position: Point) {
    this.position = position;
  }

  update(delta: number) { }

  draw(delta: number, ctx: CanvasRenderingContext2D) { }

  mouseEvent(
    event: Partial<'over' | 'Leftdown' | 'Rightdown' | 'Leftup' | 'Rightup' | 'Bothdown'>,
    position?: Point,
  ): void { }
}
