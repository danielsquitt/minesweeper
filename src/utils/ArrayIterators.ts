export const array2dIterator = function* <T>(array: Array<Array<T>>) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            yield array[i][j] as T;
        };
    }
}

export const array2dSurroundIterator = function* <T>(array: Array<Array<T>>, row: number, col: number) {
    for (let i = Math.max(row - 1, 0); i <= row + 1 && i < array.length; i++) {
        for (let j = Math.max(col - 1, 0); j <= col + 1 && j < array[i].length; j++) {
            if(i != row || j != col) yield array[i][j];
        };
    }
}

export const array2dNew = <T>(rows: number, cols:number): Array<Array<T>> => {
    return Array.from(Array(rows), () => new Array(cols).fill(Object))
}