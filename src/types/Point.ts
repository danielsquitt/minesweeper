// 2D Point definition
export type Point = {
    x: number;
    y: number,
};

export const typeOfPoint = (x: any):boolean => {
  const keys = Object.keys(x as Point);
  return keys[0] === 'x' && keys[1] === 'y' && keys.length === 2;
};
