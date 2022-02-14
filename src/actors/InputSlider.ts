/* eslint-disable import/no-unresolved */
import Actor from '../types/abstractClass/Actor';
import Slider from '../types/abstractClass/Slider';
import { MouseEvent } from '../types/Mouse';
import { Point } from '../types/Point';

export default class InputSlider extends Actor {
  slider: Slider;
  labelName: string;
  value:number;
  labelValue: string;

  constructor(position: Point, size:Point, label: string) {
    super(position, size);
    this.slider = new Slider({ x: 0, y: size.y * 0.3 }, { x: size.x, y: size.y * 0.7 });
    this.labelName = label;
    this.value = 0;
    this.labelValue = '';
  }

  setLabel(label: string) {
    this.labelValue = label;
  }

  draw(delta: number, ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);

    ctx.font = `${this.size.y * 0.3}px Arial`;
    ctx.fillStyle = 'white';
    ctx.fillText(`${this.labelName}`, 0, this.size.y * 0.3);

    ctx.font = `${this.size.y * 0.3}px Arial`;
    ctx.fillStyle = 'white';
    ctx.fillText(`${this.labelValue}`, this.size.x * 0.85, this.size.y * 0.3);

    this.slider.draw(delta, ctx);
    ctx.restore();
  }
  update(): void {
    this.value = this.slider.slider_value;
  }

  mouseEvent(event: MouseEvent, position?: Point): void {
    if (event === MouseEvent.OVER) {
      const pos = position as Point;
      this.slider.mouseEvent(event, { x: pos.x - this.position.x, y: pos.y - this.position.y });
    } else {
      this.slider.mouseEvent(event);
    }
  }
}
