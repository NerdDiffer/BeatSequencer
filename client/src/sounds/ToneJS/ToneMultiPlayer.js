import { MultiPlayer as ToneMultiPlayer } from 'tone';

/**
 * Creates a Tone.MultiPlayer for a sound definition. Can store several
 * buffers under one object.
 * @param soundParam {Object} Represents the buffers. Keys are the name
 * and values are the path to sound url.
 * See https://tonejs.github.io/docs/#MultiPlayer for more info
 */
const MultiPlayer = soundParam => {
  const sampler = new ToneMultiPlayer(soundParam, () => {
    // what you want to happen when the sample loads
  }).toMaster();
  return sampler;
};

export default MultiPlayer;
