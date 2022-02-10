import { Point } from '../types/Point';
import { Manager } from '../state/GameManager';
import { getImage } from '../resources/images';
import Button from '../types/abstractClass/Button';

export default class ResetButton extends Button {
  state: 'happy' | 'win' | 'lose';

  constructor(position: Point, size: Point) {
    super(position, size);
    this.state = 'happy';
  }

  onClick(): void {
    Manager.resetGame();
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
      const pos: Point = { x: this.position.x + this.size.x * 0.025, y: this.position.y + this.size.y * 0.025 };
      ctx.drawImage(img_down, this.position.x, this.position.y, this.size.x, this.size.y);
      ctx.drawImage(img, pos.x, pos.y, this.size.x * 0.95, this.size.y * 0.95);
    } else {
      ctx.drawImage(img, this.position.x, this.position.y, this.size.x, this.size.y);
    }
  }

}
