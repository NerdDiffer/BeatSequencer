import { Sampler } from 'tone';
import { pathToSoundFile } from '../../utils';
import soundDefs from '../';

const ToneSampler = soundUrl => {
  return new Sampler(soundUrl, () => {
    // Anything you want to happen when the Sampler object has finished loading
    // from the `soundUrl`.
    // console.log(soundUrl);
  }).toMaster();
};

const { TR808 } = soundDefs;

const createSampler = soundDef => {
  if (TR808[soundDef]) {
    const soundUrl = pathToSoundFile(TR808[soundDef]);
    return ToneSampler(soundUrl);
  }
};

export default createSampler;
