import { Point } from "../types/Point";

const imgCellUndiscover = require('../../assets/img/Cell.png');
const imgCellUndiscoverOver = require('../../assets/img/CellOver.png');
const imgCellUndiscoverDown = require('../../assets/img/CellDown.png');
const imgCellFlag = require('../../assets/img/FlagButton.png');
const imgCellFlagOver = require('../../assets/img/FlagButtonOver.png');
const imgCellFlagDown = require('../../assets/img/FlagButtonDown.png');
const imgCellEmpty = require('../../assets/img/EmptyCell.png');
const imgCellExplodedMine = require('../../assets/img/ExplodedMineCell.png');
const imgCellRevealedMine = require('../../assets/img/RevealedMineCell.png');
const imgCellFlaggedWrong = require('../../assets/img/FlaggedWrongCell.png');
const imgMineLogo = require('../../assets/img/MineLogo.png');
const imgTimeLogo = require('../../assets/img/TimeLogo.png');
const imgFaceHappy = require('../../assets/img/faceHappy.png');
const imgFaceWin = require('../../assets/img/faceWin.png');
const imgFaceLose = require('../../assets/img/faceLose.png');
const imgButtonDown = require('../../assets/img/buttonDown.png');

type ImgResource = "cell_undiscover" | "cell_undiscover_over" | 
"cell_undiscover_down" | "cell_flag" | "cell_flag_over" | "cell_flag_down" | 
"cell_empty" | "cell_exploded_mine" | "cell_revealed_mine" | "cell_flagged_wrong" |
"logo_mine" | "logo_time" |
"face_happy" | "face_win" | "face_lose" | "face_down";

type Image = {
  name: ImgResource;
  img: HTMLImageElement;
}

const Images: Array<Image> = []

// Undiscover cell
let img = new Image();
img.src = imgCellUndiscover;
Images.push({
  name: "cell_undiscover",
  img,
})

// Undiscover cell over
img = new Image();
img.src = imgCellUndiscoverOver;
Images.push({
  name: "cell_undiscover_over",
  img,
})

// Undiscover cell down
img = new Image();
img.src = imgCellUndiscoverDown;
Images.push({
  name: "cell_undiscover_down",
  img,
})

// Flagged cell
img = new Image();
img.src = imgCellFlag;
Images.push({
  name: "cell_flag",
  img,
})

// Flagged cell over
img = new Image();
img.src = imgCellFlagOver;
Images.push({
  name: "cell_flag_over",
  img,
})

// Flagged cell down
img = new Image();
img.src = imgCellFlagDown;
Images.push({
  name: "cell_flag_down",
  img,
})

// Empty cell
img = new Image();
img.src = imgCellEmpty;
Images.push({
  name: "cell_empty",
  img,
})

// Exploded mine cell
img = new Image();
img.src = imgCellExplodedMine;
Images.push({
  name: "cell_exploded_mine",
  img,
})

// Revealed cell
img = new Image();
img.src = imgCellRevealedMine;
Images.push({
  name: "cell_revealed_mine",
  img,
})

// Flagged wrong cell
img = new Image();
img.src = imgCellFlaggedWrong;
Images.push({
  name: "cell_flagged_wrong",
  img,
})

// Logo Mine
img = new Image();
img.src = imgMineLogo;
Images.push({
  name: "logo_mine",
  img,
})

//Logo Time
img = new Image();
img.src = imgTimeLogo;
Images.push({
  name: "logo_time",
  img,
})

//Face happy
img = new Image();
img.src = imgFaceHappy;
Images.push({
  name: "face_happy",
  img,
})

//Face win
img = new Image();
img.src = imgFaceWin;
Images.push({
  name: "face_win",
  img,
})

//Face lose
img = new Image();
img.src = imgFaceLose;
Images.push({
  name: "face_lose",
  img,
})

//Face down
img = new Image();
img.src = imgButtonDown;
Images.push({
  name: "face_down",
  img,
})







export const getImage = (name: string): HTMLImageElement => {
  const data =  Images.filter((e: Image) => e.name === name)
  if(data[0]) return data[0].img;
  throw new Error(`Image ${name} not found`);
  
}

export const drawImage = (ctx:CanvasRenderingContext2D, name:ImgResource, pos: Point, size:Point ) => {
  const img:HTMLImageElement = getImage(name);
  ctx.drawImage(img, pos.x, pos.y, size.x, size.y);
}