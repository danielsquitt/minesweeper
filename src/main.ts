window.onload = () => {
    var canvas = document.getElementById("canvas") as HTMLCanvasElement;
    var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, 100, 100);
}