import { getImage } from "../resources/images";
import { Manager } from "../state/GameManager";
import { Point } from "../types/Point";
import NumberBox from "../abstractClass/NumberBox";

export default class MineCnt extends NumberBox {
  constructor(position: Point, size: number,){
    super(position, size, getImage("logo_mine"), 3, 0);
  }

  update(delta: number): void {
      this.value = (Manager.map.nMines - Manager.flags).toString();
  }
}