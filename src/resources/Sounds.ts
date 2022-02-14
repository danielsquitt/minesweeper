// const soundBomb = require('../../assets/sounds/bomb.wav');
// const soundSonar = require('../../assets/sounds/sonar.ogg');

type SoundResource = 'bomb' | 'sonar';

type SoundAsset = {
  name: SoundResource,
  sound: HTMLAudioElement,
}

const Sounds: Array<SoundAsset> = [];

// let sound = new Audio(soundSonar);
// sound.preload = "auto";
// Sounds.push({
//   name: "bomb",
//   sound,
// })

const sound = new Audio();
sound.src = '../../assets/sounds/bomb.wav';
sound.preload = 'auto';
Sounds.push({
  name: 'sonar',
  sound,
});

export const getSound = (name: SoundResource): HTMLAudioElement => {
  const data = Sounds.filter((e: SoundAsset) => e.name === name);
  if (data[0]) return data[0].sound;
  throw new Error(`Sound ${name} not found`);
};

export const playSound = (name: SoundResource) => {
  const snd:HTMLAudioElement = getSound(name);
  snd.currentTime = 0;
  snd.volume = 1;
  snd.play();
};
