import {Actor} from './Actor';
import { Point, typeOfPoint } from '../types/Point';
import { Manager } from '../state/GameManager';

const imgFaceHappy = require('../../assets/img/faceHappy.png');
const imgFaceWin = require('../../assets/img/faceWin.png');
const imgFaceLose = require('../../assets/img/faceLose.png');
const imgButtonDown = require('../../assets/img/buttonDown.png');

export default class ResetButton extends Actor {
  img_FaceHappy: HTMLImageElement;

  img_FaceWin: HTMLImageElement;

  img_FaceLose: HTMLImageElement;

  img_ButtonDown: HTMLImageElement;

  state: 'happy' | 'win' | 'lose';

  size: number;

  over: boolean;

  down: boolean;

  constructor(position: Point, size: number) {
    super(position);
    this.img_FaceHappy = new Image();
    this.img_FaceHappy.src = imgFaceHappy;
    this.img_FaceWin = new Image();
    this.img_FaceWin.src = imgFaceWin;
    this.img_FaceLose = new Image();
    this.img_FaceLose.src = imgFaceLose;
    this.img_ButtonDown = new Image();
    this.img_ButtonDown.src = imgButtonDown;
    this.state = 'happy';
    this.size = size;
    this.over = false;
    this.down = false;
  }

  draw(delta: number, ctx: CanvasRenderingContext2D): void {
    let img: HTMLImageElement;
    if (Manager.end && Manager.win) {
      img = this.img_FaceWin;
    } else if (Manager.end && !Manager.win) {
      img = this.img_FaceLose;
    } else {
      img = this.img_FaceHappy;
    }
    if (this.down) {
      const pos: Point = { x: this.position.x + this.size * 0.025, y: this.position.y + this.size * 0.025 };
      ctx.drawImage(this.img_ButtonDown, this.position.x, this.position.y, this.size, this.size);
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
