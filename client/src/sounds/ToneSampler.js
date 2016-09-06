import { Sampler } from 'tone';

const ToneSampler = soundUrl => {
  return new Sampler(soundUrl, () => {
    console.log(soundUrl);
  }).toMaster();
};

export default ToneSampler;
