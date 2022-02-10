import { max, min } from "lodash";
import { MouseEvent } from "../Mouse";
import { Point } from "../Point";
import Actor from "./Actor";

export default class Slider extends Actor {
  slider_p1?: Point;
  slider_p2?: Point;
  slider_value;
  over: boolean;
  down: boolean;

  constructor(position: Point, size: Point) {
    super(position, size);
    this.slider_value = 0.3;
    this.over = false;
    this.down = false;
    const l = this.size.y;
    this.updateSliderPos();
  }

  updateSliderPos() {
    const l = this.size.y;
    this.slider_p1 = { x: -0.15 * l + this.size.x * this.slider_value, y: -0.3 * l + 0.5 * l }
    this.slider_p2 = { x: 0.15 * l + this.size.x * this.slider_value, y: 0.2 * l + 0.5 * l }
  }

  draw(delta: number, ctx: CanvasRenderingContext2D): void {
    ctx.translate(this.position.x, this.position.y);
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.rect(0, 0, this.size.x, this.size.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 0;
    ctx.strokeStyle = "grey";
    ctx.rect(0, this.size.y * 0.4, this.size.x, this.size.y * 0.2);
    ctx.fillStyle = "#d6d7d8";
    ctx.fill();
    ctx.stroke();

    const p1 = this.slider_p1 as Point;
    const p2 = this.slider_p2 as Point;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo((p1.x + p2.x) / 2, p2.y + this.size.y * 0.15);
    ctx.lineTo(p1.x, p2.y);
    ctx.closePath();

    ctx.fillStyle = 'white';
    ctx.fill();

    // Border
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
    ctx.stroke();
  }

  mouseEvent(event: MouseEvent, position?: Point): void {
    if (event === MouseEvent.OVER) {
      let pos = position as Point;
      pos = { x: pos.x - this.position.x, y: pos.y - this.position.y }
      const p1 = this.slider_p1 as Point;
      const p2 = this.slider_p2 as Point;
      this.over = pos.x >= p1.x
        && pos.x < p2.x
        && pos.y >= p1.y
        && pos.y < p2.y;

      if (this.down) {
        let pos = position as Point;
        this.slider_value = (min([max([pos.x, this.position.x]), this.position.x + this.size.x]) - this.position.x) / this.size.x
        console.log(this.slider_value);
        this.updateSliderPos();
      }

    } else if (event === MouseEvent.LEFT_DOWN) {
      if (this.over) this.down = true;
    } else if (event === MouseEvent.LEFT_UP) {
      this.down = false;
    }
  }
}