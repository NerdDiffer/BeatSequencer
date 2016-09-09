import { Sampler } from 'tone';

const ToneSampler = soundUrl => {
  return new Sampler(soundUrl, () => {
    // Anything you want to happen when the Sampler object has finished loading
    // from the `soundUrl`.
    // console.log(soundUrl);
  }).toMaster();
};

export default ToneSampler;
