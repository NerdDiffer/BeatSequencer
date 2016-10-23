import deepClone from 'lodash.clonedeep';
import createSampler from './createSampler';
import { transpose, forEachInObj } from '../../utils';

export const mapSequencesById = sequences => {
  const clonedSequences = deepClone(sequences); // don't mess with state

  const collect = (collection, sequence) => {
    const { id } = sequence;
    // TODO: would it be worth it to remove the `id` property from `sequence`
    // before assigning it to `collection`?
    collection[id] = sequence;
    return collection;
  };

  return clonedSequences.reduce(collect, {});
};

/**
 * Return an array of Tone.Sampler objects based on incoming instrumentData
 */
export const buildSamplers = instrumentData => {
  const samplers = {};

  forEachInObj(instrumentData, data => {
    const { id, soundDef } = data;
    const sampler = createSampler(soundDef);
    samplers[id] = sampler;
  });

  return samplers;
};

/**
 * Generates a 2D array of rhythms from sequences
 * 1st dimension are beat subdivisions
 * 2nd dimension is array of instrument playing (is the instrument active
 *   at this time or not?) The data in here is in the same order as the
 *   instruments in the `sequences` collection. ie: the value at
 *   index 1 corresponds to the 2nd instrument in that collection.
 */
export const instrumentEventsToMatrix = instrumentData => {
  if (instrumentData === undefined) {
    return {};
  }

  // do not name this `events`, you'd overwrite it in the callback below
  const extracted = {};

  forEachInObj(instrumentData, data => {
    const { id, events } = data;
    extracted[id] = events;
  });

  return transpose(extracted);
};

/**
 * Basically, reverse what `instrumentEventsToMatrix` does, but only for the
 * instrument represented by the `id` param.
 */
export const matrixToInstrumentEvents = (beatMatrix, id) => {
  const extractEvents = (extracted, beat) => {
    // do not allow `null`, should be 0 instead
    const val = beat[id] || 0;
    extracted.push(val);
    return extracted;
  };

  return beatMatrix.reduce(extractEvents, []);
};
