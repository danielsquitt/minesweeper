import { Point } from "../types/Point";
import { Actor } from "./Actor";

const imgTileUndiscover = require("../../assets/img/Cell.png");
const imgTileUndiscoverOver = require("../../assets/img/CellOver.png");
const imgTileUndiscoverDown = require("../../assets/img/CellDown.png");
const imgTileFlag = require("../../assets/img/FlagButton.png");
const imgTileFlagOver = require("../../assets/img/FlagButtonOver.png");
const imgTileFlagDown = require("../../assets/img/FlagButtonDown.png");

export class Tile extends Actor {
  size: Point;
  flag: boolean;
  over: boolean;
  down: boolean;
  discovered: boolean;
  img_undicover: HTMLImageElement;
  img_undicoverOver: HTMLImageElement;
  img_undicoverDown: HTMLImageElement;
  img_flag: HTMLImageElement;
  img_flagOver: HTMLImageElement;
  img_flagDown: HTMLImageElement;

  constructor(initialPos: Point, size: Point) {
    super(initialPos);
    this.size = size;
    this.flag = false;
    this.discovered = false;
    this.over = false;
    this.down = false;
    this.img_undicover = new Image();
    this.img_undicover.src = imgTileUndiscover;
    this.img_undicoverOver = new Image();
    this.img_undicoverOver.src = imgTileUndiscoverOver;
    this.img_undicoverDown = new Image();
    this.img_undicoverDown.src = imgTileUndiscoverDown;
    this.img_flag = new Image();
    this.img_flag.src = imgTileFlag;
    this.img_flagOver = new Image();
    this.img_flagOver.src = imgTileFlagOver;
    this.img_flagDown = new Image();
    this.img_flagDown.src = imgTileFlagDown;
  }

  draw(delta: number, ctx: CanvasRenderingContext2D): void {
    if (this.discovered) return;
    ctx.translate(this.position.x, this.position.y);
    if (this.flag && !this.over) {
      console.log("Type 1");
      ctx.drawImage(this.img_flag, 0, 0, this.size.x, this.size.y);
    } else if (this.flag && this.down) {
      console.log("Type 2");
      ctx.drawImage(this.img_flagDown, 0, 0, this.size.x, this.size.y);
    } else if (this.flag && this.over) {
      console.log("Type 3");
      ctx.drawImage(this.img_flagOver, 0, 0, this.size.x, this.size.y);
    } else if (!this.flag && !this.over) {
      console.log("Type 4");
      ctx.drawImage(this.img_undicover, 0, 0, this.size.x, this.size.y);
    } else if (!this.flag && this.down) {
      console.log("Type 5");
      ctx.drawImage(this.img_undicoverDown, 0, 0, this.size.x, this.size.y);
    } else if (!this.flag && this.over) {
      console.log("Type 6");
      ctx.drawImage(this.img_undicoverOver, 0, 0, this.size.x, this.size.y);
    }
  }
}
