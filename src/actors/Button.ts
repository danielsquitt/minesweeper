/* eslint-disable import/no-unresolved */
import Actor from '../types/Actor';
import { Point, typeOfPoint } from '../types/Point';
import { MouseEvent } from '../types/Mouse';

export default class Button extends Actor {
  over: boolean;
  down: boolean;
  label: string;
  color: string;
  onClick: () => void;

  constructor(position: Point, size: Point, label: string, color: string, onClick: () => void) {
    super(position, size);
    this.over = false;
    this.down = false;
    this.label = label;
    this.color = color;
    this.onClick = onClick;
  }

  draw(delta: number, ctx: CanvasRenderingContext2D): void {
    ctx.font = `${this.size.y}px Arial`;
    ctx.fillStyle = 'white';
    ctx.fillText(`${this.label}`, this.position.x, this.position.y + this.size.y);
  }

  // Mouse event
  mouseEvent(
    event: MouseEvent,
    position?: Point,
  ): void {
    // Event over
    if (event === MouseEvent.OVER && typeOfPoint(position)) {
      const pos = position as Point;
      const over = pos.x >= this.position.x
          && pos.x <= this.position.x + this.size.x
          && pos.y >= this.position.y
          && pos.y <= this.position.y + this.size.y;
      if (over) {
        this.over = true;
      } else {
        this.over = false;
        this.down = false;
      }

      // Event mouse left down
    } else if (event === MouseEvent.LEFT_DOWN) {
      if (this.over) {
        this.down = true;
      }
    } else if (event === MouseEvent.LEFT_UP) {
      if (this.over) {
        this.down = false;
        this.over = false;
        this.onClick();
      }
    }
  }
}
