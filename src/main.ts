/* eslint-disable import/no-unresolved */
import { IActor } from './types/Actor';
import FPSViewer from './actors/FPSViewer';
import Map from './actors/Map';
import ResetButton from './actors/ResetButton';
import { Manager, newManager, StateManager } from './state/GameManager';
import { MouseEvent } from './types/Mouse';
import LevelSelector from './actors/LevelSelector';
import { DEF_HEIGTH, DEF_MINES, DEF_WIDTH } from './config';
import Button from './actors/Button';
import NumberBox from './actors/NumberBox';
import { getImage } from './resources/images';

window.onload = () => {
  // Get canvas elements
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

  // Build actors
  // ---------------------------------------------------------------------------
  const FPS = new FPSViewer(
    { x: 10, y: 0 },
    { x: ctx.canvas.height * 0.04, y: ctx.canvas.height * 0.04 },
  );
  const levelButton = new Button(
    { x: ctx.canvas.width - 200, y: 0 },
    { x: 200, y: ctx.canvas.height * 0.04 },
    'Level',
    'white',
    () => {
      Manager.setState(StateManager.LEVEL_SELECTOR);
    },
  );

  const mineCnt = new NumberBox(
    { x: ctx.canvas.width * 0.05, y: ctx.canvas.height * 0.10 },
    ctx.canvas.width * 0.05,
    getImage('logo_mine'),
    3,
    () => (Manager.map.nMines - Manager.flags).toString(),
  );

  const timer = new NumberBox(
    { x: ctx.canvas.width * 0.95, y: ctx.canvas.height * 0.10 },
    ctx.canvas.width * 0.05,
    getImage('logo_time'),
    3,
    () => Manager.chrono.toFixed(0),
    0,
    true,
  );

  const resetButton = new ResetButton(
    { x: ctx.canvas.width * 0.475, y: ctx.canvas.height * 0.10 },
    { x: ctx.canvas.width * 0.05, y: ctx.canvas.width * 0.05 },
  );

  // Start manager
  // -----------------------------------------------------------------
  const workspace = {
    pos: {
      x: ctx.canvas.width * 0.05,
      y: ctx.canvas.height * 0.20,
    },
    size: {
      x: ctx.canvas.width * 0.9,
      y: ctx.canvas.height * 0.75,
    },
  };

  const map = new Map(workspace.pos, workspace.size, { x: DEF_WIDTH, y: DEF_HEIGTH }, DEF_MINES);
  const levelSelector = new LevelSelector(workspace.pos, workspace.size);
  newManager(map, levelSelector);

  // Actors Array
  // ---------------------------------------------------------------------------------------------
  const actors: Array<IActor> = [FPS, levelButton, mineCnt, timer, resetButton, Manager];

  let lastFrame = 0;
  const render = (time: number) => {
    const delta = (time - lastFrame) / 1000;
    lastFrame = time;

    actors.forEach((e) => { e.update(delta); });

    // Draw bacground
    // ---------------------------------------------------------------
    // Draw backgound rectangle
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'black';
    ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.closePath();
    const clg = ctx.createLinearGradient(0 + 500, 0, ctx.canvas.width - 500, ctx.canvas.height);
    clg.addColorStop(0, '#919FBA');
    clg.addColorStop(0.5, '#D1D7E3');
    clg.addColorStop(1, '#919FBA');
    ctx.fillStyle = clg;
    ctx.fill();
    ctx.stroke();

    // Header rectangle
    ctx.beginPath();
    ctx.lineWidth = 0;
    ctx.rect(10, 10, ctx.canvas.width - 10, ctx.canvas.height * 0.04);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.stroke();

    // Update actors
    actors.forEach((actor) => {
      actor.update(delta);
    });

    // Draw actors
    actors.forEach((actor) => {
      ctx.save();
      actor.draw(delta, ctx);
      ctx.restore();
    });
    window.requestAnimationFrame(render);
  };
  window.requestAnimationFrame(render);

  // Prevent context menu
  canvas.oncontextmenu = (event) => { event.preventDefault(); event.stopPropagation(); };

  // Mouse over event
  canvas.addEventListener('mousemove', (event) => {
    const cRect = canvas.getBoundingClientRect(); // Gets CSS pos, and width/height
    const x = Math.round(event.clientX - cRect.left) * 2; // Subtract the 'left' of the canvas
    const y = Math.round(event.clientY - cRect.top) * 2; // from the X/Y positions to make
    actors.forEach((actor) => {
      actor.mouseEvent(MouseEvent.OVER, { x, y });
    });
  });

  // Mouse down event
  canvas.addEventListener('mousedown', (event) => {
    if (event.buttons === 3) {
      actors.forEach((actor) => {
        actor.mouseEvent(MouseEvent.BOTHDOWN);
      });
    } else if (event.button === 0) {
      actors.forEach((actor) => {
        actor.mouseEvent(MouseEvent.LEFT_DOWN);
      });
    } else if (event.button === 2) {
      actors.forEach((actor) => {
        actor.mouseEvent(MouseEvent.RIGHT_DOWN);
      });
    }
  });

  // Mouse up event
  canvas.addEventListener('mouseup', (event) => {
    if (event.button === 0) {
      actors.forEach((actor) => {
        actor.mouseEvent(MouseEvent.LEFT_UP);
      });
    } else if (event.button === 2) {
      actors.forEach((actor) => {
        actor.mouseEvent(MouseEvent.RIGHT_UP);
      });
    }
  });
};
