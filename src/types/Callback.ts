export type CallbackOneParameter<T, K> = (n: T) => K;

const soundBomb = require("../../assets/wav/bomb.wav");
const soundSonar = require("../../assets/wav/sonar.mp3");

type SoundResource = "bomb" | "sonar";

type SoundAsset = {
  name: SoundResource;
  sound: HTMLAudioElement;
}

const Sounds: Array<SoundAsset> = [];

// Bomb
let sound = new Audio();
sound.src = soundBomb;
sound.preload = "auto";
Sounds.push({
  name:"bomb",
  sound,
})

// Bomb
sound = new Audio();
sound.src = soundSonar;
sound.preload = "auto";
Sounds.push({
  name:"sonar",
  sound,
})