/* eslint-disable import/no-unresolved */
import Actor from '../types/Actor';

export default class FPSViewer extends Actor {
  draw(delta: number, ctx: CanvasRenderingContext2D) {
    const fps = (1 / delta).toFixed(2);
    ctx.font = `${this.size.y}px Arial`;
    ctx.fillStyle = 'white';
    ctx.fillText(`FPS:${fps}`, this.position.x, this.position.y + this.size.y);
  }
}
