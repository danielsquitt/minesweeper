import { Actor } from "./Actor";
import { Point } from "../types/Point";

const imgFaceHappy = require("../../assets/img/faceHappy.png");
const imgFaceWin = require("../../assets/img/faceHappy.png");
const imgFaceLose = require("../../assets/img/faceHappy.png");


export class ResetButton extends Actor {
    img_FaceHappy: HTMLImageElement; 
    img_FaceWin: HTMLImageElement; 
    img_FaceLose: HTMLImageElement; 
    state: "happy" | "win" | "lose";
    size: number;
    
    constructor(position: Point, size: number) {
        super(position);
        this.img_FaceHappy = new Image();
        this.img_FaceHappy.src = imgFaceHappy;
        this.img_FaceWin = new Image();
        this.img_FaceWin.src = imgFaceHappy;
        this.img_FaceLose = new Image();
        this.img_FaceLose.src = imgFaceHappy;
        this.state = "happy";
        this.size = size;
    }

    draw(delta: number, ctx: CanvasRenderingContext2D): void {        
        ctx.drawImage(this.img_FaceHappy, this.position.x, this.position.y, this.size, this.size)
    }
}