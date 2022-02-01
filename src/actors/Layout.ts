import { Actor } from "./Actor";
import { NumberBox } from "./NumberBox";

const imgMineLogo = require("../../assets/img/MineLogo.png");

export class Layout extends Actor {
    //timer: NumberBox;
    mine_cnt:NumberBox;
    

    constructor(){
        super({x: 0, y: 0})
        let img = new Image();
        img.src = imgMineLogo;
        this.mine_cnt = new NumberBox({x: 100, y: 100}, 100, img, 3, 222);
    }

    draw(delta: number, ctx: CanvasRenderingContext2D): void {

        // Draw backgound rectangle
        ctx.beginPath();
        ctx.lineWidth = 10;
        ctx.strokeStyle = "black";
        ctx.rect(this.position.x, this.position.y, ctx.canvas.width, ctx.canvas.height);
        ctx.closePath();
        let clg = ctx.createLinearGradient(0+500, 0, ctx.canvas.width-500, ctx.canvas.height);
        clg.addColorStop(0, "#919FBA");
        clg.addColorStop(0.5, "#D1D7E3");
        clg.addColorStop(1, "#919FBA");
        ctx.fillStyle = clg;
        ctx.fill();
        ctx.stroke();

        this.mine_cnt.draw(delta, ctx);


    }
}