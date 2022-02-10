import {Point} from '../types/Point';
import Actor from '../types/abstractClass/Actor';

export default class FPSViewer extends Actor {
  constructor(position: Point, size: Point) {
    super(position, size); 
  }

  draw(delta: number, ctx: CanvasRenderingContext2D) {
    
    const fps = (1 / delta).toFixed(2);
    ctx.font = `${this.size.y}px Arial`;
    ctx.fillStyle = 'white';
    ctx.fillText(`FPS:${fps}`, this.position.x, this.position.y + this.size.y);
  }
}