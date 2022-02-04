import { setSyntheticTrailingComments } from "typescript";
import { Actor, IActor } from "../actors/Actor";
import { Map } from "../actors/Map";
import { Point } from "../types/Point";


class GameManager extends Actor {
    map: Map;       // Current map
    start: boolean; // The game is started
    end: boolean;
    win: boolean;
    flags: number;
    chrono: number;

    remanding_mines: number;

    constructor(map: Map, pos: Point = { x: 0, y: 0 }) {
        super(pos);
        this.flags = 0;
        this.remanding_mines = map.nMines;
        this.start = false;
        this.end = false;
        this.win = false;
        this.chrono = 0;
        this.map = map;
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
        this.map.draw(delta, ctx)
    }

    mouseEvent(
        event: "over" | "Leftdown" | "Rightdown" | "Leftup" | "Rightup" | "Bothdown",
        position?: Point
    ): void {
        this.map.mouseEvent(event, position);
    }

    resetGame(){
        this.start = false;
        this.end = false;
        this.win = false;
        this.chrono = 0;
        this.flags = 0;
        this.map.resetMap();
    }

    setStart() {
        this.start = true;
        this.updateGameState()
    }
    setFlag(state: boolean) {
        if (state) {
            this.flags += 1
        } else {
            this.flags -= 1
        }
        this.updateGameState()
    }
    updateGameState() {
        let state = this.map.checkMap();
        if (state === "win") {
            this.end = true;
            this.start = false;
            this.win = true;
        } else if (state === "lose") {
            this.end = true;
            this.start = false;
        }
    }
}

export var Manager: GameManager;

export const newManager = (map: Map): void => {
    Manager = new GameManager(map);
}