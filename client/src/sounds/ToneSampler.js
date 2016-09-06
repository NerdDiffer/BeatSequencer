import { Sampler } from 'tone';

const ToneSampler = soundUrl => {
  new Sampler(soundUrl => {
    console.log(soundUrl);
  }).toMaster();
};

export default ToneSampler;
