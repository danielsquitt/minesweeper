/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
import { Point } from '../types/Point';

type ImgResource = 'cell_undiscover' | 'cell_undiscover_over' |
  'cell_undiscover_down' | 'cell_flag' | 'cell_flag_over' | 'cell_flag_down' |
  'cell_empty' | 'cell_exploded_mine' | 'cell_revealed_mine' | 'cell_flagged_wrong' |
  'logo_mine' | 'logo_time' |
  'face_happy' | 'face_win' | 'face_lose' | 'face_down';

type ImageAsset = {
  name: ImgResource;
  img: HTMLImageElement;
}

const resources = [
  { label: 'cell_undiscover', file: require('../../assets/img/Cell.png') },
  { label: 'cell_undiscover_over', file: require('../../assets/img/CellOver.png') },
  { label: 'cell_undiscover_down', file: require('../../assets/img/CellDown.png') },
  { label: 'cell_flag', file: require('../../assets/img/FlagButton.png') },
  { label: 'cell_flag_over', file: require('../../assets/img/FlagButtonOver.png') },
  { label: 'cell_flag_down', file: require('../../assets/img/FlagButtonDown.png') },
  { label: 'cell_empty', file: require('../../assets/img/EmptyCell.png') },
  { label: 'cell_exploded_mine', file: require('../../assets/img/ExplodedMineCell.png') },
  { label: 'cell_revealed_mine', file: require('../../assets/img/RevealedMineCell.png') },
  { label: 'cell_flagged_wrong', file: require('../../assets/img/FlaggedWrongCell.png') },
  { label: 'logo_mine', file: require('../../assets/img/MineLogo.png') },
  { label: 'logo_time', file: require('../../assets/img/TimeLogo.png') },
  { label: 'face_happy', file: require('../../assets/img/faceHappy.png') },
  { label: 'face_win', file: require('../../assets/img/faceWin.png') },
  { label: 'face_lose', file: require('../../assets/img/faceLose.png') },
  { label: 'face_down', file: require('../../assets/img/buttonDown.png') },
];

const Images: Array<ImageAsset> = resources.map((resource) => {
  const help = {
    name: resource.label as ImgResource,
    img: new Image(),
  };
  help.img.src = resource.file;
  return help;
});

export const getImage = (name: ImgResource): HTMLImageElement => {
  const data = Images.filter((e: ImageAsset) => e.name === name);
  if (data[0]) return data[0].img;
  throw new Error(`Image ${name} not found`);
};

export const drawImage = (
  ctx: CanvasRenderingContext2D,
  name: ImgResource,
  pos: Point,
  size: Point,
) => {
  const imgage: HTMLImageElement = getImage(name);
  ctx.drawImage(imgage, pos.x, pos.y, size.x, size.y);
};
