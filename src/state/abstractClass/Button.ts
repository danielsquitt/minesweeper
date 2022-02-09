import Actor from '../abstractClass/Actor';
import { Point, typeOfPoint } from '../types/Point';
import { Manager } from '../state/GameManager';

export default class Button extends Actor {
  size: number;
  over: boolean;
  down: boolean;

  constructor(position: Point, size: number) {
    super(position);
    this.size = size;
    this.over = false;
    this.down = false;
  }

  // Mouse event
  mouseEvent(
    event: 'over' | 'Leftdown' | 'Rightdown' | 'Leftup' | 'Rightup' | 'Bothdown',
    position?: Point,
  ): void {
    // Event over
    if (event === 'over' && typeOfPoint(position)) {
      const pos = position as Point;
      const over = pos.x >= this.position.x
          && pos.x <= this.position.x + this.size
          && pos.y >= this.position.y
          && pos.y <= this.position.y + this.size;
      if (over) {
        this.over = true;
      } else {
        this.over = false;
        this.down = false;
      }

      // Event mouse left down
    } else if (event === 'Leftdown') {
      if (this.over) {
        this.down = true;
      }
    } else if (event === 'Leftup') {
      if (this.over) {
        this.down = false;
        Manager.resetGame();
      }
    }
  }
}
