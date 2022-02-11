import { MAX_HEIGTH, MAX_MINE_RATIO, MAX_WIDTH, MIN_HEIGTH, MIN_MINE_RATIO, MIN_WIDTH } from "../config";
import { Manager } from "../state/GameManager";
import Actor from "../types/abstractClass/Actor";
import { MouseEvent } from "../types/Mouse";
import { Point } from "../types/Point";
import InputSlider from "./InputSlider";
import _ from 'lodash'

export default class LevelSelector extends Actor {
  nMines: number;
  boarWidth: number;
  boarHeigth: number;

  inputSize: InputSlider;
  inputNMines: InputSlider;

  constructor(position: Point, size: Point) {
    super(position, size);

    this.nMines = MIN_HEIGTH * MIN_WIDTH * MIN_MINE_RATIO;
    this.boarHeigth = MIN_HEIGTH;
    this.boarWidth = MIN_WIDTH;

    this.inputSize = new InputSlider({ x: size.x * 0.1, y: size.y * 0.1 }, { x: size.x * 0.8, y: size.y * 0.2 }, "Board Size");
    this.inputNMines = new InputSlider({ x: size.x * 0.1, y: size.y * 0.5 }, { x: size.x * 0.8, y: size.y * 0.2 }, "Number of mines");
  }

  draw(delta: number, ctx: CanvasRenderingContext2D): void {
    ctx.translate(this.position.x, this.position.y);
    ctx.beginPath();
    ctx.lineWidth = 0;
    ctx.rect(0, 0, this.size.x, this.size.y);
    ctx.fillStyle = "#5c6577";
    ctx.fill();
    ctx.stroke();

    this.inputSize.draw(delta, ctx);
    this.inputNMines.draw(delta, ctx);
  }

  update(delta: number): void {
    this.inputSize.update(delta);
    this.inputNMines.update(delta);


    // Board size
    this.boarWidth = _.floor((MAX_WIDTH - MIN_WIDTH) * this.inputSize.value + MIN_WIDTH)
    this.boarHeigth = _.floor((MAX_HEIGTH - MIN_HEIGTH) * this.inputSize.value + MIN_HEIGTH)
    // Number of mines
    const min_nMines = this.boarWidth * this.boarHeigth * MIN_MINE_RATIO;
    const max_nMines = this.boarWidth * this.boarHeigth * MAX_MINE_RATIO;
    this.nMines = _.floor((max_nMines - min_nMines) * this.inputNMines.value + min_nMines)

    // Set texts
    this.inputSize.setLabel(`${_.padStart(this.boarWidth.toString(), 2, '0')}x${_.padStart(this.boarHeigth.toString(), 2, '0')}`);
    this.inputNMines.setLabel(`${this.nMines}`);
  }

  mouseEvent(event: MouseEvent, position?: Point): void {
    let pos = position || { x: 0, y: 0 };
    pos = { x: pos.x - this.position.x, y: pos.y - this.position.y };
    this.inputSize.mouseEvent(event, pos)
    this.inputNMines.mouseEvent(event, pos)
  }
}