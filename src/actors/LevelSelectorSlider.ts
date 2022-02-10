import { Manager } from "../state/GameManager";
import Actor from "../types/abstractClass/Actor";
import Slider from "../types/abstractClass/Slider";
import { MouseEvent } from "../types/Mouse";
import { Point } from "../types/Point";
import _ from 'lodash'

export default class LevelSelectorSlider extends Actor {
  slider: Slider;
  heith: number;
  width: number;
  constructor(position: Point, size:Point) {
    super(position, size);
    this.slider = new Slider({x:0, y: size.y*0.3}, {x: size.x, y: size.y * 0.7});
    this.heith = 9; // 9 - 20
    this.width = 9; // 9 - 30
  }

  draw(delta: number, ctx: CanvasRenderingContext2D): void {

    ctx.translate(this.position.x, this.position.y);

    ctx.font = `${this.size.y*0.3}px Arial`;
    ctx.fillStyle = 'white';
    ctx.fillText(`Size`, 0, this.size.y*0.3);

    ctx.font = `${this.size.y*0.3}px Arial`;
    ctx.fillStyle = 'white';
    ctx.fillText(`${_.padStart(this.width.toString(), 2, '0')}x${_.padStart(this.heith.toString(), 2, '0')}`, this.size.x*0.85, this.size.y*0.3);

    this.slider.draw(delta, ctx);
  }

  updateData(){
    this.heith = _.floor((20-9)*this.slider.slider_value+9)
    this.width = _.floor((30-9)*this.slider.slider_value+9)
  }

  mouseEvent(event: MouseEvent, position?: Point): void {
    if(event === MouseEvent.OVER){
      const pos = position as Point;
      this.slider.mouseEvent(event, {x: pos.x - this.position.x, y: pos.y - this.position.y});
      this.updateData()
    } else {
      this.slider.mouseEvent(event);
    }
  }


}