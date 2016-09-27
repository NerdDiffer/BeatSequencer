import { Sequence } from 'tone';
import isEmpty from 'lodash.isempty';
import { generateRange, forEachInObj } from '../../utils';

const loopStart = '0m';
const loopEnd = '1m';
const subdivision = 16;
const defaultEvents = generateRange(subdivision);

/**
 * Generate a Tone.Sequence object based on the following parameters:
 * Store a reference to parentObject's beatMatrix & samplers properties.
 * @param samplers, {Array} Tone.MultiPlayer objects
 * @param beatMatrix, {Array} describes rhythmic patterns of each instrument
 * For more info: https://tonejs.github.io/docs/#Sequence
 */
const createSequence = function (parentObj) {
  const callback = function (time, beat) {
    // skip if beat matrix is undefined or empty
    if (parentObj.beatMatrix === undefined || isEmpty(parentObj.beatMatrix)) {
      return;
    }

    const currentBeat = parentObj.beatMatrix[beat];
    // go through each sample
    forEachInObj(parentObj.samplers, (sampler, samplerId) => {
      const isActive = currentBeat[samplerId] === 1;

      // if the sample is active at this time...
      if (isActive) {
        // then select the sample and play the note
        const note = 0;
        // Assumes that `instrumentData` and `samplers` have parallel indices.
        // If they are not, then bugs happen.
        sampler && sampler.triggerAttackRelease(note);
      }
    });
  };

  const sequence = new Sequence(callback, defaultEvents, `${subdivision}n`);
  sequence.loopStart = loopStart;
  sequence.loopEnd = loopEnd;
  return sequence;
};

export default createSequence;
