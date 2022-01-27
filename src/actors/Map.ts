import { Point } from "../types/Point";
import { Actor } from "./Actor";
import _ from 'lodash';

export class Map extends Actor {
    size: Point;  // Size in number of tilles
    sizePx: Point;  // Size in pixels
    m: number;
    constructor(sizePx: Point, sizeN: Point, m: number) {
        super({ x: 0, y: 0 });
        this.size = sizeN;
        let cellSize = Math.min(Math.floor(sizeN.x / sizePx.x), Math.floor(sizeN.y / sizePx.y));
        this.sizePx = { x: sizePx.x * cellSize, y: sizePx.y * cellSize };
        this.m = m;

        this.generateMap(this.size.x, this.size.y, this.m);
    }
    // Generates a map. -1 Mine, 0,...8 No mine
    generateMap(w: number, h: number, m: number) {
        // Generate an empty map
        let map: Array<Array<number>> = Array.from(Array(h), () => new Array(w).fill(0))
        
        // Set bombs
        for (let i = 0; i < m; i++) {
            while (true) { 
                let h_ = _.random(0, h - 1);
                let w_ = _.random(0, w - 1);
                if (map[h_][w_] !== -1){
                    map[h_][w_] = -1
                    break;
                }
            }
        }
        console.table(map);
    }
}