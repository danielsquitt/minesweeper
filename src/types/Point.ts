// 2D Point definition
export type Point = { x: number; y: number };

export const typeOfPoint = (x: any) => {
    let keys = Object.keys(x as Point)
    return keys[0] == 'x' && keys[1] == 'y' && keys.length == 2;
}
