import { Point } from "../types/Point";
import { Actor } from "./Actor";
import _ from "lodash"

const radius: number = 25;

export class NumberBox extends Actor {
    size: Point;
    charSize: Point;
    img: HTMLImageElement;
    value: string;

    constructor(position: Point, size: number, img: HTMLImageElement, maxDigits: number, value: number = 0) {
        super(position);
        this.charSize = { x: size * 0.8, y: size * 0.7 }
        this.size = { x: this.charSize.x * maxDigits, y: size };
        this.img = img;
        this.value = value.toString();
    }

    draw(delta: number, ctx: CanvasRenderingContext2D): void {
        // Draw Img
        ctx.drawImage(this.img, this.position.x, this.position.y, this.size.y + 3 * radius, this.size.y + 3 * radius)

        // Draw Rectangle
        ctx.save();
        ctx.translate(this.position.x + this.size.y + 4 * radius, this.position.y + radius / 2)
        ctx.beginPath();

        ctx.moveTo(radius, 0);
        ctx.lineTo(this.size.y, 0);
        ctx.arc(this.size.x + radius, radius, radius, -Math.PI / 2, 0)
        ctx.lineTo(this.size.x + 2 * radius, this.size.y + radius);
        ctx.arc(this.size.x + radius, this.size.y + radius, radius, 0, Math.PI / 2)
        ctx.lineTo(radius, this.size.y + 2 * radius);
        ctx.arc(radius, this.size.y + radius, radius, Math.PI / 2, Math.PI)
        ctx.lineTo(0, radius);
        ctx.arc(radius, radius, radius, Math.PI, -Math.PI / 2)
        ctx.closePath()

        let clg = ctx.createRadialGradient(radius + this.size.x / 2, radius + this.size.y / 2, 0, radius + this.size.x / 2, radius + this.size.y / 2, this.size.x);
        clg.addColorStop(1, "#2a5ea3");
        clg.addColorStop(0, "#4f87d1");
        ctx.fillStyle = clg;
        ctx.fill();
        //ctx.closePath();   
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#053e89";
        ctx.stroke();

        const width = (this.size.x - this.value.length * this.charSize.x)/2

        ctx.fillStyle = "white";        
        ctx.font = `${this.size.y * this.size.y / this.charSize.y}px Arial`;
        ctx.fillText(String(this.value), radius + width, radius + this.size.y)





        ctx.restore();
    }


}