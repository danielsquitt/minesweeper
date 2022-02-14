/* eslint-disable import/no-unresolved */
import { Manager } from '../state/GameManager';
import { CallbackOneParameter } from '../types/Callback';
import { Point } from '../types/Point';
import Actor from '../types/abstractClass/Actor';
import { drawImage } from '../resources/images';

const colors = [
  '#ffffff', // 0 - undefined
  '#244AFC', // 1 - undefined
  '#407F07', // 2 - undefined
  '#E93F33', // 3 - undefined
  '#0C207E', // 4 - undefined
  '#811F18', // 5 - undefined
  '#3A8181', // 6 - undefined
  '#000000', // 7 - undefined
  '#808080', // 8 - undefined
];

export default class Cell extends Actor {
  // Dimensinal paramters
  flag: boolean;
  // State parameters
  bomb: boolean;
  number: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  over: boolean;
  down: boolean;
  discovered: boolean;
  // eslint-disable-next-line no-use-before-define
  cells: Array<Cell>;

  constructor(initialPos: Point, size: Point) {
    super(initialPos, size);
    this.flag = false;
    this.discovered = false;
    this.bomb = false;
    this.number = 0;
    this.over = false;
    this.down = false;
    this.cells = [];
  }

  draw(delta: number, ctx: CanvasRenderingContext2D): void {
    ctx.translate(this.position.x, this.position.y);
    if (!this.discovered) { // UNDICOVER TILES
      if (Manager.end && this.flag && !this.bomb) {
        // Flaged wrong
        drawImage(ctx, 'cell_flagged_wrong', { x: 0, y: 0 }, this.size);
      } else if (Manager.end && this.bomb && !this.flag) {
        // Recealed Mina
        drawImage(ctx, 'cell_revealed_mine', { x: 0, y: 0 }, this.size);
      } else if (this.flag) {
        if (this.down) {
          // Falg down
          drawImage(ctx, 'cell_flag_down', { x: 0, y: 0 }, this.size);
        } else if (this.over) {
          // Flag over
          drawImage(ctx, 'cell_flag_over', { x: 0, y: 0 }, this.size);
        } else {
          // Falg
          drawImage(ctx, 'cell_flag', { x: 0, y: 0 }, this.size);
        }
      } else if (this.down) {
        // Undiscover down
        drawImage(ctx, 'cell_undiscover_down', { x: 0, y: 0 }, this.size);
      } else if (this.over) {
        // Undiscover over
        drawImage(ctx, 'cell_undiscover_over', { x: 0, y: 0 }, this.size);
      } else {
        // Undiscover
        drawImage(ctx, 'cell_undiscover', { x: 0, y: 0 }, this.size);
      }
    } else if (this.bomb) {
      // Exploded mine
      drawImage(ctx, 'cell_exploded_mine', { x: 0, y: 0 }, this.size);
    } else {
      // Empty mine
      drawImage(ctx, 'cell_empty', { x: 0, y: 0 }, this.size);
      if (this.number > 0) {
        ctx.font = `${this.size.x * 0.8}px Arial`;
        ctx.fillStyle = colors[this.number];
        ctx.fillText(this.number.toString(), this.size.x * 0.27, this.size.y * 0.80);
      }
    }
  }

  onDiscoverSurround() {
    // Count flags arround
    const flags = this.cells.reduce((acc, e) => (e.flag ? ++acc : acc), 0);
    if (flags === this.number && flags) {
      for (const cell of this.cells) {
        if (!cell.flag) cell.onDiscover();
      }
    }
  }

  onDiscover() {
    this.discovered = true;
    this.down = false;
    if (this.number === 0 && !this.bomb) {
      for (let i = 0; i < this.cells.length; i++) {
        if (!this.cells[i].discovered) { this.cells[i].onDiscover(); }
      }
    }
    Manager.setStart();
  }

  setOver = (state: boolean) => {
    this.over = state;
    if (!state) this.down = false;
    if (state && (Manager.mouse.leftDown || Manager.mouse.rightDown)) this.down = true;
  };

  setDownLeft = (state: boolean, checkOver: boolean = true): void => {
    if (state) {
      // Left down
      if ((this.over || !checkOver) && !this.flag) { this.down = true; }
    } else {
      // Left up
      if (this.over && !this.flag && !this.discovered && !Manager.mouse.bothDown) this.onDiscover();
      if (this.over && this.discovered && Manager.mouse.bothDown) this.onDiscoverSurround();
      this.down = false;
    }
  };

  setDownRigth = (state: boolean): void => {
    if (state) {
      // Right down
      if (this.over) this.down = true;
    } else {
      // Right up
      if (this.over && !this.discovered && !Manager.mouse.bothDown) {
        this.setFlag((stt) => !stt);
      }
      this.down = false;
    }
  };

  setFlag(state: CallbackOneParameter<boolean, boolean> | boolean) {
    const flagOld = this.flag;
    if (typeof state === 'boolean') {
      this.flag = state;
    } else {
      this.flag = state(this.flag);
    }
    if (flagOld !== this.flag) { Manager.setFlag(this.flag); }
  }

  setBomb() {
    this.bomb = true;
  }

  increaseNumber() {
    this.number++;
  }
}
