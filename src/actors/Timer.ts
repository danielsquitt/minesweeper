import { getImage } from "../resources/images";
import { Manager } from "../state/GameManager";
import { Point } from "../types/Point";
import NumberBox from "../types/abstractClass/NumberBox";

export default class Timer extends NumberBox {
  constructor(position: Point, size: number,){
    super(position, size, getImage("logo_time"), 3, 0, true);
  }

  update(delta: number): void {
      this.value = Manager.chrono.toFixed(0);
  }
}