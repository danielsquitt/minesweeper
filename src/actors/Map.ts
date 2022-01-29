import { Point, typeOfPoint } from "../types/Point";
import { Actor } from "./Actor";
import _, { map, max, min } from 'lodash';
import { Tile } from "./Tile";
import { array2dIterator, array2dNew, array2dSurroundIterator } from "../utils/ArrayIterators";

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
/*
        for(let i = 0; i < this.map.length; i++){
            for(let j = 0; j < this.map[i].length; j++){
                this.map[i][j].iterator = array2dSurroundIterator(this.map, i, j);
            }
        }*/
    }
    // Generates a map. -1 Mine, 0,...8 No mine
    generateMap(w: number, h: number, m: number, cellSize: Point): Array<Array<Tile>> {
        // Generate an empty map
        let map: Array<Array<Tile>> = array2dNew<Tile>(h, w);
        for(let i = 0; i < map.length; i++){
            for(let j = 0; j < map[i].length; j++){
                map[i][j]= new Tile({ x: cellSize.x * i, y: cellSize.y * j }, cellSize, array2dSurroundIterator(map, i, j));
            }
        }
        /*.map((row, i_row, array) => row.map((cell, i_cell) => {
           return new Tile({ x: cellSize.x * i_cell, y: cellSize.y * i_row }, cellSize, array2dSurroundIterator(array, i_row, i_cell));
        }))*/

        // Set bombs
        for (let i = 0; i < m; i++) {
            while (true) {
                let h_ = _.random(0, h - 1);
                let w_ = _.random(0, w - 1);
                if (!map[h_][w_].bomb) {
                    //setBomb(map, h_, w_)
                    for(let cell of array2dSurroundIterator<Tile>(map, h_, w_)){
                        cell.increaseNumber();
                    }
                    map[h_][w_].setBomb();
                    break;
                }
            }
        }
        console.log(map);
        return map;
    }

    // Draw 
    draw(delta: number, ctx: CanvasRenderingContext2D) {
        for (let cell of array2dIterator(this.map)) {
            ctx.save();
            cell.draw(delta, ctx);
            ctx.restore();
        }
    }

    // Mouse event
    mouseEvent(event: "over", position: Point): void;
    mouseEvent(event: "Leftdown"): void;
    mouseEvent(event: "Rightdown"): void;
    mouseEvent(event: "Leftup"): void;
    mouseEvent(event: "Rightup"): void;
    mouseEvent(event: "Bothdown"): void;
    mouseEvent(event: string, position?: Point): void {
        // Event over
        if (event === "over" && typeOfPoint(position)) {
            let pos = position as Point;
            for (let cell of array2dIterator(this.map)) {
                let over = pos.x >= cell.position.x && pos.x <= cell.position.x + cell.size.x && pos.y >= cell.position.y && pos.y <= cell.position.y + cell.size.y
                cell.setOver(over, this.mouse.leftDown || this.mouse.rightDown)
            }
            // Event mouse left down
        } else if (event === "Leftdown") {
            this.mouse.leftDown = true;
            for (let cell of array2dIterator(this.map)) {
                cell.setDownLeft(true)
            }
        } else if (event === "Leftup") {
            this.mouse.leftDown = false;
            for (let cell of array2dIterator(this.map)) {
                cell.setDownLeft(false)
            }
        } else if (event === "Rightdown") {
            this.mouse.rightDown = true;
            for (let cell of array2dIterator(this.map)) {
                cell.setDownRigth(true);
            }
        } else if (event === "Rightup") {
            this.mouse.rightDown = false;
            for (let cell of array2dIterator(this.map)) {
                cell.setDownRigth(false);
            }
        }
    }
}
