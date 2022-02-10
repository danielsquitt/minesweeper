import Button from "../types/abstractClass/Button";
import { Point } from "../types/Point";

export default class LevelSelecButtonAcept extends Button {
  constructor(position: Point, size: Point) {
    super(position, size);
  }

  onClick(): void {
      console.log("Click");   
  }

  draw(delta: number, ctx: CanvasRenderingContext2D): void {
    ctx.font = `${this.size.y}px Arial`;
    ctx.fillStyle = 'black';
    ctx.fillText(`Acept`, this.position.x, this.position.y + this.size.y);
  }

}