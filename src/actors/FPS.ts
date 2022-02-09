import {Point} from '../types/Point';
import Actor from '../types/abstractClass/Actor';

export default class FPSViewer extends Actor {
  size: number;
  constructor(position: Point, size: number) {
    super(position); 
    this.size = size;
  }

  draw(delta: number, ctx: CanvasRenderingContext2D) {
    
    const fps = (1 / delta).toFixed(2);
    ctx.font = `${this.size}px Arial`;
    ctx.fillStyle = 'white';
    ctx.fillText(`FPS:${fps}`, this.position.x, this.position.y);
  }
}