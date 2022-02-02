import { Point } from "../types/Point";
import { Actor } from "./Actor";
import { NumberBox } from "./NumberBox";
import { ResetButton } from "./ResetButton";

const imgMineLogo = require("../../assets/img/MineLogo.png");
const imgTimeLogo = require("../../assets/img/TimeLogo.png");

export class Layout extends Actor {
    timer: NumberBox;
    mineCnt: NumberBox;
    resetButton: ResetButton;
    first: boolean;
    mapPos: { pos: Point, size: Point };

    constructor(ctx: CanvasRenderingContext2D) {
        super({ x: 0, y: 0 })
        let imgMine = new Image();
        imgMine.src = imgMineLogo;
        this.mineCnt = new NumberBox({ x: ctx.canvas.width * 0.05, y: ctx.canvas.height * 0.05 }, ctx.canvas.width * 0.05, imgMine, 3, 0);
        let imgTime = new Image();
        imgTime.src = imgTimeLogo;
        this.timer = new NumberBox({ x: ctx.canvas.width * 0.95, y: ctx.canvas.height * 0.05 }, ctx.canvas.width * 0.05, imgTime, 3, 0, true);
        this.resetButton = new ResetButton({ x: ctx.canvas.width * 0.475, y: ctx.canvas.height * 0.05 }, ctx.canvas.width * 0.05)
        this.first = true;
        this.mapPos = {
            pos: {
                x: ctx.canvas.width * 0.05,
                y: ctx.canvas.height * 0.15,
            },
            size: {
                x: ctx.canvas.width * 0.9,
                y: ctx.canvas.height * 0.80,
            },
        }
    }

    draw(delta: number, ctx: CanvasRenderingContext2D): void {
        if (this.first) {
            this.first = false
            
            // Draw backgound rectangle
            ctx.beginPath();
            ctx.lineWidth = 10;
            ctx.strokeStyle = "black";
            ctx.rect(this.position.x, this.position.y, ctx.canvas.width, ctx.canvas.height);
            ctx.closePath();
            let clg = ctx.createLinearGradient(0 + 500, 0, ctx.canvas.width - 500, ctx.canvas.height);
            clg.addColorStop(0, "#919FBA");
            clg.addColorStop(0.5, "#D1D7E3");
            clg.addColorStop(1, "#919FBA");
            ctx.fillStyle = clg;
            ctx.fill();
            ctx.stroke();
        }
        this.mineCnt.draw(delta, ctx);
        this.timer.draw(delta, ctx);
        this.resetButton.draw(delta, ctx);
    }
}