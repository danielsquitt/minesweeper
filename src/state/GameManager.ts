/* eslint-disable import/no-unresolved */
import LevelSelector from '../actors/LevelSelector';
import Map from '../actors/Map';
import { IActor } from '../types/abstractClass/Actor';
import { MouseEvent } from '../types/Mouse';
import { Point } from '../types/Point';

export enum StateManager {
  LEVEL_SELECTOR,
  PLAY
}

class GameManager implements IActor {
  map: Map; // Current map
  levelSelector: LevelSelector;
  state: StateManager;
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

  constructor(map: Map, levelSelector: LevelSelector) {
    this.flags = 0;
    this.remanding_mines = map.nMines;
    this.start = false;
    this.end = false;
    this.win = false;
    this.chrono = 0;
    this.map = map;
    this.levelSelector = levelSelector;
    this.mouse = { leftDown: false, rightDown: false, bothDown: false };
    this.state = StateManager.LEVEL_SELECTOR;
  }

  update(delta: number) {
    if (this.start) {
      this.chrono += delta;
    }
    if (this.chrono >= 999) {
      this.end = true;
      this.start = false;
    }
    if (this.state === StateManager.LEVEL_SELECTOR) {
      this.levelSelector.update();
    }
  }

  draw(delta: number, ctx: CanvasRenderingContext2D): void {
    switch (this.state) {
      case StateManager.LEVEL_SELECTOR:
        this.levelSelector.draw(delta, ctx);
        break;
      case StateManager.PLAY:
        this.map.draw(delta, ctx);
        break;
      default:
        break;
    }
  }

  mouseEvent(
    event: MouseEvent,
    position?: Point,
  ): void {
    switch (event) {
      case MouseEvent.LEFT_DOWN:
        this.mouse.leftDown = true;
        this.mouse.bothDown = false;
        break;
      case MouseEvent.RIGHT_DOWN:
        this.mouse.rightDown = true;
        this.mouse.bothDown = false;
        break;
      case MouseEvent.LEFT_UP:
        this.mouse.leftDown = false;
        break;
      case MouseEvent.RIGHT_UP:
        this.mouse.rightDown = false;
        break;
      case MouseEvent.BOTHDOWN:
        this.mouse.leftDown = true;
        this.mouse.rightDown = true;
        this.mouse.bothDown = true;
        break;
      default:
        break;
    }
    switch (this.state) {
      case StateManager.LEVEL_SELECTOR:
        this.levelSelector.mouseEvent(event, position);
        break;
      case StateManager.PLAY:
        this.map.mouseEvent(event, position);
        break;
      default:
        break;
    }
    switch (event) {
      case MouseEvent.LEFT_UP:
        if (!this.mouse.rightDown) {
          this.mouse.bothDown = false;
        }
        break;
      case MouseEvent.RIGHT_UP:
        if (!this.mouse.leftDown) {
          this.mouse.bothDown = false;
        }
        break;
      default:
        break;
    }
  }

  resetGame(sizeN?: Point, nMines?: number) {
    this.start = false;
    this.end = false;
    this.win = false;
    this.chrono = 0;
    this.flags = 0;
    this.map.resetMap(sizeN, nMines);
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
    if (this.start) { this.updateGameState(); }
  }

  SetState(state:StateManager) {
    this.state = state;
  }

  updateGameState() {
    const state = this.map.checkMap();
    if (state === 'win') {
      this.end = true;
      this.start = false;
      this.win = true;
      this.map.onEnd(true);
    } else if (state === 'lose') {
      this.end = true;
      this.start = false;
      this.map.onEnd(false);
    }
  }
}

// eslint-disable-next-line import/no-mutable-exports
export let Manager: GameManager;

export const newManager = (map: Map, levelSelector: LevelSelector): void => {
  Manager = new GameManager(map, levelSelector);
};
