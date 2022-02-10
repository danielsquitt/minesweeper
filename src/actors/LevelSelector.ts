import Actor from "../types/abstractClass/Actor";
import Slider from "../types/abstractClass/Slider";
import { MouseEvent } from "../types/Mouse";
import { Point } from "../types/Point";

export default class LevelSelector extends Actor {
  sizeSlider: Slider;


  constructor(position: Point, size: Point) {
    super(position, size);
    this.sizeSlider = new Slider({ x: size.x * 0.1, y: size.y * 0.3 }, { x: size.x * 0.8, y: size.y * 0.1 });
  }

  draw(delta: number, ctx: CanvasRenderingContext2D): void {
    ctx.translate(this.position.x, this.position.y);
    ctx.beginPath();
    ctx.lineWidth = 0;
    ctx.rect(0,0, this.size.x, this.size.y);
    ctx.fillStyle = "#5c6577";
    ctx.fill();
    ctx.stroke();

    this.sizeSlider.draw(delta, ctx)
  }

  mouseEvent(event: MouseEvent, position?: Point): void {
    if(event === MouseEvent.OVER){
      const pos = position as Point;
      this.sizeSlider.mouseEvent(event, {x: pos.x - this.position.x, y: pos.y - this.position.y});
    } else {
      this.sizeSlider.mouseEvent(event);
    }
  }
}