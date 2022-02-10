import Actor from "../types/abstractClass/Actor";
import { MouseEvent } from "../types/Mouse";
import { Point } from "../types/Point";
import LevelSelecButtonCancel from "./LevelSelectorButonCancel";
import LevelSelecButtonAcept from "./LevelSelectorButtonAcept";
import LevelSelectorSlider from "./LevelSelectorSlider";
import MineSelectorSlider from "./MineSelectorSlider";

export default class LevelSelector extends Actor {

  elements: Array<Actor>;

  constructor(position: Point, size: Point) {
    super(position, size);
    this.elements = [];
    this.elements.push(new LevelSelectorSlider({ x: size.x * 0.1, y: size.y * 0.1 }, { x: size.x * 0.8, y: size.y * 0.2 }));
    this.elements.push(new MineSelectorSlider({ x: size.x * 0.1, y: size.y * 0.5 }, { x: size.x * 0.8, y: size.y * 0.2 }));
    this.elements.push(new LevelSelecButtonCancel({x: size.x*0.05 , y: size.y*0.85 }, {x: 250 , y: size.y*0.07 }))
    this.elements.push(new LevelSelecButtonAcept({x: size.x*0.82 , y: size.y*0.85 }, {x: 200 , y: size.y*0.07 }))
  }

  draw(delta: number, ctx: CanvasRenderingContext2D): void {
    ctx.translate(this.position.x, this.position.y);
    ctx.beginPath();
    ctx.lineWidth = 0;
    ctx.rect(0,0, this.size.x, this.size.y);
    ctx.fillStyle = "#5c6577";
    ctx.fill();
    ctx.stroke();

    this.elements.forEach(e => {
      ctx.save();
      e.draw(delta, ctx)
      ctx.restore();
    })
  }

  mouseEvent(event: MouseEvent, position?: Point): void {
      let pos = position || {x: 0, y: 0};
      pos = {x: pos.x - this.position.x, y: pos.y - this.position.y};
      this.elements.forEach(e => e.mouseEvent(event, pos))
  }
}