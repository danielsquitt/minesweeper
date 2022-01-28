import { Point, typeOfPoint } from "../types/Point";
import { Actor } from "./Actor";
import _, { map, max, min } from 'lodash';
import { Tile } from "./Tile";

export class Map extends Actor {
    size: Point;  // Size in number of tilles of map
    sizePxCell: Point;  // Size in pixels of cell
    m: number;
    map: Array<Array<Tile>>;
    mouse: {
        leftDown: boolean,
        rightDown: boolean
    }

    constructor(sizePx: Point, sizeN: Point, m: number) {
        if (m / (sizeN.x * sizeN.y) > 0.3) throw new Error(`Error: Bomb density ${m / (sizeN.x * sizeN.y)} is bigger than ${0.3}`);
        super({ x: 0, y: 0 });
        this.size = sizeN;
        let cellSize = Math.min(Math.floor(sizePx.x / sizeN.x), Math.floor(sizePx.y / sizeN.y));
        this.sizePxCell = { x: cellSize, y: cellSize };
        this.m = m;
        this.mouse = { leftDown: false, rightDown: false };

        this.map = this.generateMap(this.size.x, this.size.y, this.m, this.sizePxCell);
        console.log(this.map);

    }
    // Generates a map. -1 Mine, 0,...8 No mine
    generateMap(w: number, h: number, m: number, cellSize: Point): Array<Array<Tile>> {
        // Generate an empty map
        console.time("Timer");
        let map: Array<Array<number>> = Array.from(Array(h), () => new Array(w).fill(0))

        // Set bombs
        for (let i = 0; i < m; i++) {
            while (true) {
                let h_ = _.random(0, h - 1);
                let w_ = _.random(0, w - 1);
                if (map[h_][w_] !== -1) {
                    setBomb(map, h_, w_)
                    break;
                }
            }
        }
        console.log(map);
        console.timeEnd("Timer");

        return map.map((row, i_row) => row.map((cell, i_cell) => {
            let tile = new Tile({ x: cellSize.x * i_cell, y: cellSize.y * i_row }, cellSize);
            if (cell == -1) tile.bomb = true;
            else tile.number = cell as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
            return tile;
        }))
    }

    // Draw 
    draw(delta: number, ctx: CanvasRenderingContext2D) {
        for (let cell of mapIterator(this.map)) {
            ctx.save();
            cell.draw(delta, ctx);
            ctx.restore();
        }
    }

    // Mouse event
    mouseEvent(event: "over", data: Point): void;
    mouseEvent(event: "Leftdown"): void;
    mouseEvent(event: "Rightdown"): void;
    mouseEvent(event: "Leftup"): void;
    mouseEvent(event: "Rightup"): void;
    mouseEvent(event: "Bothdown"): void;
    mouseEvent(event: unknown, data?: unknown): void {
        // Event over
        if (event === "over" && typeOfPoint(data)) {
            let pos = data as Point;
            for (let cell of mapIterator(this.map)) {
                if (pos.x >= cell.position.x && pos.x <= cell.position.x + cell.size.x && pos.y >= cell.position.y && pos.y <= cell.position.y + cell.size.y) {
                    cell.over = true;
                    cell.down = (this.mouse.leftDown || this.mouse.rightDown) && !cell.flag;
                } else {
                    cell.over = false;
                    cell.down = false;
                }
            }
            // Event mouse left down
        } else if (event === "Leftdown") {            
            this.mouse.leftDown = true;
            for (let cell of mapIterator(this.map)) {
                if (cell.over && !cell.flag) {
                    cell.down = true;
                    break;
                }
            }
        } else if (event === "Leftup") {
            this.mouse.leftDown = false;
            for (let cell of mapIterator(this.map)) {
                if (cell.over) {
                    cell.down = false;
                    if (!cell.flag) cell.discovered = true;
                    break;
                }
            }
        } else if (event === "Rightdown") {
            this.mouse.rightDown = true;
            for (let cell of mapIterator(this.map)) {
                if (cell.over) {
                    cell.down = true;
                    break;
                }
            }
        } else if (event === "Rightup") {
            this.mouse.rightDown = false;
            for (let cell of mapIterator(this.map)) {
                if (cell.over) {
                    cell.down = false;
                    cell.flag = !cell.flag;
                    break;
                }
            }
        }
    }



}

const setBomb = (map: Array<Array<number>>, h: number, w: number) => {
    for (let i = Math.max(h - 1, 0); i <= h + 1 && i < map.length; i++) {
        for (let j = Math.max(w - 1, 0); j <= w + 1 && j < map[0].length; j++) {
            if (i == h && j == w) map[i][j] = -1
            else if (map[i][j] != -1) map[i][j]++
        }

    }
}

const mapIterator = function* (map: Array<Array<Tile>>) {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            yield map[i][j];
        };
    }
}