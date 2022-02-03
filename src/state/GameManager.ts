import { IActor } from "../actors/Actor";
import { Map } from "../actors/Map";


class GameManager {
    map: Map;       // Current map
    start: boolean; // The game is started
    end: boolean;   
    win: boolean;
    mines: number;

    remanding_mines: number;

    constructor(map :Map) {
        this.mines = map.nMines;
        this.remanding_mines = map.nMines;
        this.start = false;
        this.end = false;
        this.win = false;
        this.map = map;
    }

    newMap = () => {

    }
} 

export let Manager: GameManager;

export const newMap = (map: Map): void => {
    Manager = new GameManager(map);
}