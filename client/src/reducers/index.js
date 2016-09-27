import { combineReducers } from 'redux';
// import sequence from './sequence'
import {
  ADD_SEQUENCE,
  REMOVE_SEQUENCE,
  UPDATE_SEQUENCE,
  CHANGE_BPM,
  TOGGLE_PLAYING
} from '../actions/types';
import {
  defaultSequences,
  defaultSoundKeys,
  defaultNewSequence
} from '../data';
import { generateId } from '../utils';

const sequences = (state = defaultSequences, action) => {
  switch (action.type) {
    case ADD_SEQUENCE: {
      const newSequence = Object.assign(
        {},
        defaultNewSequence,
        { id: generateId() }
      );

      return [
        ...state,
        newSequence
      ];
    }
    case REMOVE_SEQUENCE:
      return state.filter((sequence) => sequence.id !== action.id);
    case UPDATE_SEQUENCE: {
      const update = sequence => {
        if (sequence.id !== action.sequence.id) {
          return sequence;
        } else {
          const { soundDef, events, subdivision, mute } = action.sequence;
          const tone = 0;

          return Object.assign(
            {},
            sequence,
            { tone, soundDef, events, subdivision, mute }
          );
        }
      };

      return state.map(update);
    }
    default:
      return state;
  }
};

const bpm = (state = 120, action) => {
  switch (action.type) {
    case CHANGE_BPM:
      return action.bpm;
    default:
      return state;
  }
};

const playing = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_PLAYING:
      return !state;
    default:
      return state;
  }
};

const soundSets = (state = defaultSoundKeys, action) => {
  return state;
};

export default combineReducers({
  sequences,
  bpm,
  playing,
  soundSets
});

export { sequences, bpm, playing };
