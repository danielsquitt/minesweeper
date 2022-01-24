window.onload = () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  ctx.font = "30px Arial";
  ctx.fillText("Hello World", 10, 50);
};
