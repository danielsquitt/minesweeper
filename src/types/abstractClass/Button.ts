import Actor from './Actor';
import { Point, typeOfPoint } from '../Point';
import { MouseEvent } from '../Mouse';

export default class Button extends Actor {
  over: boolean;
  down: boolean;

  constructor(position: Point, size: Point) {
    super(position, size); 
    this.over = false;
    this.down = false;
  }

  onClick(){}

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
        this.onClick();
      }
    }
  }
}
