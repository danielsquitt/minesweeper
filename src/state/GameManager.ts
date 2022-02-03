import { setSyntheticTrailingComments } from "typescript";
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
    setStart(){
        this.start = true;
        this.updateGameState()
    }
    setFlag(state:boolean){
        if(state){
            this.remanding_mines -= 1
        }else{
            this.remanding_mines += 1
        }
        this.updateGameState()
    }
    updateGameState(){
        let state = this.map.checkMap();
        if(state === "win"){
            this.end = true;
            this.start = false;
            this.win = true;
        }else if(state === "lose"){
            this.end = true;
            this.start = false;
        }
        console.log("Mines:", this.remanding_mines + "/" + this.mines, "Start:", this.start, "End:", this.end, "Win:", this.win);   
    }
    resetGame(){
        newMap(new Map(this.map.position, this.map.sizePx, this.map.size, this.map.nMines))
    }



} 





export let Manager: GameManager;

export const newMap = (map: Map): void => {
    Manager = new GameManager(map);
}