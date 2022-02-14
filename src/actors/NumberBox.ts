/* eslint-disable import/no-unresolved */
import { getCharWith } from '../utils/utils';
import { Point } from '../types/Point';
import Actor from '../types/Actor';

const RADIUS: number = 0.1; // proportion of heigth
const SPACING: number = 0.1;
const PAD_H: number = 0.1;
const PAD_VERTICAL: number = 0.1;

export default class NumberBox extends Actor {
  nChar: number;
  img: HTMLImageElement;
  value: string;
  inverted: boolean;
  updateValue: ()=>string;

  constructor(
    position: Point,
    size: number,
    img: HTMLImageElement,
    maxDigits: number,
    updateValue: ()=>string,
    value: number = 0,
    inverted: boolean = false,
  ) {
    super(position, { x: getCharWith(size, maxDigits), y: size });
    this.img = img;
    this.value = value.toString();
    this.nChar = maxDigits;
    this.inverted = inverted;
    this.updateValue = updateValue;
  }

  update(): void {
    this.value = this.updateValue();
  }

  draw(delta: number, ctx: CanvasRenderingContext2D): void {
    // Calc
    const rad = Math.min(RADIUS * this.size.y, 0.5 * this.size.y);
    const fontSize = (this.size.y - 2 * PAD_VERTICAL * this.size.y);
    const offset = (this.size.x - getCharWith(this.size.y, String(this.value).length)) / 2;

    // Draw Img
    ctx.save();
    ctx.translate(this.inverted ? -1 * (this.size.y) : 0, 0);
    ctx.drawImage(this.img, this.position.x, this.position.y, this.size.y, this.size.y);
    ctx.restore();

    ctx.save();
    if (this.inverted) {
      ctx.translate(
        // eslint-disable-next-line max-len
        this.position.x - 1 * (this.size.y * (1 + SPACING) + this.size.x + 2 * (rad + PAD_H * this.size.y)),
        this.position.y,
      );
    } else {
      ctx.translate(
        this.position.x + this.size.y * (1 + SPACING),
        this.position.y,
      );
    }

    // Draw Rectangle
    ctx.beginPath();
    ctx.arc(this.size.x + rad + 2 * PAD_H * this.size.y, rad, rad, -Math.PI / 2, 0);
    ctx.arc(
      this.size.x + rad + 2 * PAD_H * this.size.y,
      this.size.y - rad,
      rad,
      0,
      Math.PI / 2,
    );
    ctx.arc(rad, this.size.y - rad, rad, Math.PI / 2, Math.PI);
    ctx.arc(rad, rad, rad, Math.PI, -Math.PI / 2);
    ctx.closePath();

    // Draw background
    const clg = ctx.createRadialGradient(
      rad + this.size.x / 2,
      rad + this.size.y / 2,
      0,
      rad + this.size.x / 2,
      rad + this.size.y / 2,
      this.size.x,
    );
    clg.addColorStop(1, '#2a5ea3');
    clg.addColorStop(0, '#4f87d1');
    ctx.fillStyle = clg;
    ctx.fill();

    // Border
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#053e89';
    ctx.stroke();

    // Draw text
    ctx.fillStyle = 'white';
    ctx.font = `${fontSize / 0.7}px Arial`;
    ctx.fillText(
      String(this.value),
      rad + PAD_H * this.size.y + offset,
      this.size.y - PAD_VERTICAL * this.size.y,
    );
    ctx.restore();
  }
}
