import { Point } from "../types/Point";
import { Actor } from "./Actor";

const imgTileUndiscover = require("../../assets/img/Cell.png");
const imgTileUndiscoverOver = require("../../assets/img/CellOver.png");
const imgTileUndiscoverDown = require("../../assets/img/CellDown.png");
const imgTileFlag = require("../../assets/img/FlagButton.png");
const imgTileFlagOver = require("../../assets/img/FlagButtonOver.png");
const imgTileFlagDown = require("../../assets/img/FlagButtonDown.png");
const imgTileEmpty = require("../../assets/img/EmptyCell.png");
const imgTileExplodedMine = require("../../assets/img/ExplodedMineCell.png");
const imgTileRevealedMine = require("../../assets/img/RevealedMineCell.png");
const imgTileFlaggedWrong = require("../../assets/img/FlaggedWrongCell.png");

const colors = [
  '#ffffff',     // 0 - undefined
  '#244AFC',     // 1 - undefined
  '#407F07',     // 2 - undefined
  '#E93F33',     // 3 - undefined
  '#0C207E',     // 4 - undefined
  '#811F18',     // 5 - undefined
  '#3A8181',     // 6 - undefined
  '#000000',     // 7 - undefined
  '#808080',     // 8 - undefined
]

export class Tile extends Actor {
  // Dimensinal paramters
  size: Point;
  flag: boolean;
  // State parameters
  bomb: boolean;
  number: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  over: boolean;
  down: boolean;
  end: boolean;
  discovered: boolean;
  // Others
  change: boolean;
  // Images
  img_undiscover: HTMLImageElement;
  img_undiscoverOver: HTMLImageElement;
  img_undiscoverDown: HTMLImageElement;
  img_flag: HTMLImageElement;
  img_flagOver: HTMLImageElement;
  img_flagDown: HTMLImageElement;
  img_empty: HTMLImageElement;
  img_explodedMine: HTMLImageElement;
  img_revealedMine: HTMLImageElement;
  img_flaggedWrong: HTMLImageElement;

  constructor(initialPos: Point, size: Point) {

    super(initialPos);
    this.size = size;
    this.flag = false;
    this.discovered = false;
    this.bomb = false;
    this.number = 0;
    this.over = false;
    this.down = false;
    this.end = false;
    this.change = false
    this.img_undiscover = new Image();
    this.img_undiscover.src = imgTileUndiscover;
    this.img_undiscoverOver = new Image();
    this.img_undiscoverOver.src = imgTileUndiscoverOver;
    this.img_undiscoverDown = new Image();
    this.img_undiscoverDown.src = imgTileUndiscoverDown;
    this.img_flag = new Image();
    this.img_flag.src = imgTileFlag;
    this.img_flagOver = new Image();
    this.img_flagOver.src = imgTileFlagOver;
    this.img_flagDown = new Image();
    this.img_flagDown.src = imgTileFlagDown;
    this.img_empty = new Image();
    this.img_empty.src = imgTileEmpty;
    this.img_explodedMine = new Image();
    this.img_explodedMine.src = imgTileExplodedMine;
    this.img_revealedMine = new Image();
    this.img_revealedMine.src = imgTileRevealedMine;
    this.img_flaggedWrong = new Image();
    this.img_flaggedWrong.src = imgTileFlaggedWrong;
  }

  draw(delta: number, ctx: CanvasRenderingContext2D): void {
    if(!this.change) return;
    this.change = false;
    ctx.translate(this.position.x, this.position.y);
    if (!this.discovered) { // UNDICOVER TILES
      if (this.end && this.flag && !this.bomb) {
        ctx.drawImage(this.img_flaggedWrong, 0, 0, this.size.x, this.size.y);
      } else if (this.end && this.bomb && !this.flag) {
        ctx.drawImage(this.img_revealedMine, 0, 0, this.size.x, this.size.y);
      } else {
        if (this.flag) {
          if (this.down) {
            ctx.drawImage(this.img_flagDown, 0, 0, this.size.x, this.size.y);
          } else if (this.over) {
            ctx.drawImage(this.img_flagOver, 0, 0, this.size.x, this.size.y);
          } else {
            ctx.drawImage(this.img_flag, 0, 0, this.size.x, this.size.y);
          }
        } else {
          if (this.down) {
            ctx.drawImage(this.img_undiscoverDown, 0, 0, this.size.x, this.size.y);
          } else if (this.over) {
            ctx.drawImage(this.img_undiscoverOver, 0, 0, this.size.x, this.size.y);
          } else {
            ctx.drawImage(this.img_undiscover, 0, 0, this.size.x, this.size.y);
          }
        }
      }
    } else {  // DISCOVERED TILES
      if (this.bomb) {
        ctx.drawImage(this.img_explodedMine, 0, 0, this.size.x, this.size.y);
      } else {
        ctx.drawImage(this.img_empty, 0, 0, this.size.x, this.size.y);
        if (this.number > 0) {
          ctx.font = `${this.size.x * 0.8}px Arial`;
          ctx.fillStyle = colors[this.number];
          ctx.fillText(this.number.toString(), this.size.x * 0.27, this.size.y * 0.80);
        }
      }
    }
  }

  setOver = (state: boolean, mouseDown: boolean = false):void => {
    this.change = true;
    this.over = state;
    if(!state) this.down = false;
    if(state && mouseDown) this.down = true;
  }
  setDownLeft = (state: boolean): void => {
    this.change = true;
    if (!this.over || this.flag)  return;
    this.down = state;
    if (!this.flag && !state) this.discovered = true;
  }
  setDownRigth = (state: boolean): void => {
    this.change = true;
    if (!this.over)  return;
    this.down = state;
    if(!state) this.flag = !this.flag;
  }
  setBomb(){
    this.bomb = true;
  }
  increaseNumber(){
    this.number++
  }

}
