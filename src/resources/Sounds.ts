//const soundBomb = require('../../assets/sounds/bomb.wav');
//const soundSonar = require('../../assets/sounds/sonar.ogg');

type SoundResource = "bomb" | "sonar";

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

let sound = new Audio();
sound.src = '../../assets/sounds/bomb.wav';
sound.preload = "auto";
Sounds.push({
  name: "sonar",
  sound,
})


export const getSound = (name: SoundResource): HTMLAudioElement => {
  const data =  Sounds.filter((e: SoundAsset) => e.name === name)
  if(data[0]) return data[0].sound;
  throw new Error(`Sound ${name} not found`);
}

export const playSound = (name: SoundResource) => {
  const sound:HTMLAudioElement = getSound(name);
  sound.currentTime = 0;
  sound.volume = 1
  sound.play();
}