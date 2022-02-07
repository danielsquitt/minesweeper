import {Point} from '../types/Point';
import Actor from './Actor';

export default class FPSViewer extends Actor {
  constructor(position: Point) {
    super(position);  }

  draw(delta: number, ctx: CanvasRenderingContext2D) {
    
    const fps = (1 / delta).toFixed(2);
    ctx.font = '50px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(`FPS:${fps}`, this.position.x, this.position.y);
  }
}