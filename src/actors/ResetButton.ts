import Actor from './Actor';
import { Point, typeOfPoint } from '../types/Point';
import { Manager } from '../state/GameManager';
import { getImage } from '../resources/images';

export default class ResetButton extends Actor {
  state: 'happy' | 'win' | 'lose';
  size: number;
  over: boolean;
  down: boolean;

  constructor(position: Point, size: number) {
    super(position);
    this.state = 'happy';
    this.size = size;
    this.over = false;
    this.down = false;
  }

  draw(delta: number, ctx: CanvasRenderingContext2D): void {
    let img: HTMLImageElement;
    let img_down: HTMLImageElement = getImage("face_down");
    if (Manager.end && Manager.win) {
      img = getImage("face_win");
    } else if (Manager.end && !Manager.win) {
      img = getImage("face_lose");
    } else {
      img = getImage("face_happy");
    }
    if (this.down) {
      const pos: Point = { x: this.position.x + this.size * 0.025, y: this.position.y + this.size * 0.025 };
      ctx.drawImage(img_down, this.position.x, this.position.y, this.size, this.size);
      ctx.drawImage(img, pos.x, pos.y, this.size * 0.95, this.size * 0.95);
    } else {
      ctx.drawImage(img, this.position.x, this.position.y, this.size, this.size);
    }
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
