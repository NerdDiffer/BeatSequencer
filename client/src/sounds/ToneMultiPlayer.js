import { MultiPlayer } from 'tone';
import TR808 from './TR808';

const defs = ['Cowbell', 'Clap', 'BassDrum', 'SnareDrum'];
const pathToSoundFile = soundDef => `/dist/sounds/TR808/${TR808[soundDef]}`;

/**
 * @param soundDefs, {Array} of strings
 */
const mapBufferObj = soundDefs => {
  var obj = {};

  soundDefs.forEach(soundDef => {
    obj[soundDef] = pathToSoundFile(soundDef);
  });

  return obj;
};

const ToneMultiPlayer = mappedSounds => {
  const player = new MultiPlayer(mappedSounds, () => {
    // player.start();
    for (let sound in mappedSounds) {
      player.start(sound);
    }
  });

  return player.toMaster();
};

const mappedBufferObj = mapBufferObj(defs);
const multiPlayer = ToneMultiPlayer(mappedBufferObj);
export default multiPlayer;
