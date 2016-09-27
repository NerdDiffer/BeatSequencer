import { Transport, Sequence as ToneSequence } from 'tone';
import { transpose, pathToSoundFile } from '../../utils';
import ToneSampler from './ToneSampler';
import soundDefs from '../';
const { TR808 } = soundDefs;

const createSampler = soundDef => {
  if (TR808[soundDef]) {
    const soundUrl = pathToSoundFile(TR808[soundDef]);
    return ToneSampler(soundUrl);
  }
};

const setTransportBPM = (bpm = 120) => {
  Transport.bpm.value = bpm;
};

const buildSamplers = parentObj => {
  const sequences = parentObj.instrumentData;
  const samplers = [];

  sequences.forEach(({ soundDef }) => {
    const sampler = createSampler(soundDef);

    if (sampler) {
      samplers.push(sampler);
    }
  });

  return samplers;
};

const defaultEvents = ((len) => {
  const events = [];
  let i = 0;

  while (i < len) {
    events.push(i);
    i += 1;
  }

  return events;
})(16);


/**
 * Generates a 2D array of rhythms from instrumentData
 * 1st dimension are beat subdivisions
 * 2nd dimension is array of instrument playing (is the instrument active
 *   at this time or not?) The data in here is in the same order as the
 *   instruments in the `instrumentData` collection. ie: the value at
 *   index 1 corresponds to the 2nd instrument in that collection.
 */
const instrumentEventsToMatrix = parentObj => {
  const { instrumentData } = parentObj;
  const events = instrumentData.map(inst => inst.events);
  return transpose(events);
};

/**
 * @param parentObj, {Object} the component using ToneJS, the BeatSequencer
 *   assumes that these properties exist (not part of component/global state):
 *   - `instrumentData`: raw data, application state passed in as props to the
 *      BeatSequencer component
 *   - `samplers`: Tone.MultiPlayer objects that were registered before
 */
const createSequence = parentObj => {
  const { instrumentData, samplers, beatMatrix } = parentObj;

  const callback = (time, beat) => {
    const currentBeat = beatMatrix[beat];
    // go through each sample
    for (let i = 0; i < instrumentData.length; i += 1) {
      const isActive = currentBeat[i] === 1;

      // if the sample is active at this time...
      if (isActive) {
        // then select the sample and play the note
        const note = 0;
        const sampler = samplers[i];
        sampler && sampler.triggerAttackRelease(note);
      }
    }
  };

  const sequence = new ToneSequence(callback, defaultEvents, '16n');
  sequence.loopStart = '0m';
  sequence.loopEnd = '1m';
  return sequence;
};

const init = (parentObj, { bpm, sequences }) => {
  // register objects as properties on parent object
  parentObj.instrumentData = sequences;
  parentObj.samplers = buildSamplers(parentObj);
  parentObj.beatMatrix = instrumentEventsToMatrix(parentObj);
  parentObj.sequence = createSequence(parentObj);

  // initialize tempo & set Tone.Transport to start
  setTransportBPM(bpm);
  Transport.start();
};

export {
  setTransportBPM,
  createSampler,
  init
}
