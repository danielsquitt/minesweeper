import { Actor } from '../actors/Actor';
import Map from '../actors/Map';
import { Point } from '../types/Point';

class GameManager extends Actor {
  map: Map; // Current map

  start: boolean; // The game is started
  end: boolean;
  win: boolean;
  flags: number;
  chrono: number;
  remanding_mines: number;
  mouse: {
    leftDown: boolean;
    rightDown: boolean;
    bothDown: boolean;
  };

  constructor(map: Map, pos: Point = { x: 0, y: 0 }) {
    super(pos);
    this.flags = 0;
    this.remanding_mines = map.nMines;
    this.start = false;
    this.end = false;
    this.win = false;
    this.chrono = 0;
    this.map = map;
    this.mouse = { leftDown: false, rightDown: false, bothDown: false };
  }

  update(delta: number) {
    if (this.start) {
      this.chrono += delta;
    }
    if (this.chrono >= 999) {
      this.end = true;
      this.start = false;
    }
  }

  draw(delta: number, ctx: CanvasRenderingContext2D): void {
    this.map.draw(delta, ctx);
  }

  mouseEvent(
    event: 'over' | 'Leftdown' | 'Rightdown' | 'Leftup' | 'Rightup' | 'Bothdown',
    position?: Point,
  ): void {
    if (event === 'Leftdown') {
      this.mouse.leftDown = true;
      this.mouse.bothDown = false;
      this.map.mouseEvent(event, position);
    } else if (event === 'Rightdown') {
      this.mouse.rightDown = true;
      this.mouse.bothDown = false;
      this.map.mouseEvent(event, position);
    } else if (event === 'Leftup') {
      this.mouse.leftDown = false;
      this.map.mouseEvent(event, position);
      if (!this.mouse.rightDown) {
        this.mouse.bothDown = false;
      }
    } else if (event === 'Rightup') {
      this.mouse.rightDown = false;
      this.map.mouseEvent(event, position);
      if (!this.mouse.leftDown) {
        this.mouse.bothDown = false;
      }
    } else if (event === 'Bothdown') {
      this.mouse.leftDown = true;
      this.mouse.rightDown = true;
      this.mouse.bothDown = true;
      this.map.mouseEvent(event, position);
    } else {
      this.map.mouseEvent(event, position);
    }

  }

  resetGame() {
    this.start = false;
    this.end = false;
    this.win = false;
    this.chrono = 0;
    this.flags = 0;
    this.map.resetMap();
  }

  setStart() {
    this.start = true;
    this.updateGameState();
  }

  setFlag(state: boolean) {
    if (state) {
      this.flags += 1;
    } else {
      this.flags -= 1;
    }
    if (this.start)
      this.updateGameState();
  }

  updateGameState() {
    const state = this.map.checkMap();
    if (state === 'win') {
      this.end = true;
      this.start = false;
      this.win = true;
      this.map.onEnd(true)
    } else if (state === 'lose') {
      this.end = true;
      this.start = false;
      this.map.onEnd(false)
    }
  }
}

// eslint-disable-next-line import/no-mutable-exports
export let Manager: GameManager;

export const newManager = (map: Map): void => {
  Manager = new GameManager(map);
};
