import { combineReducers } from 'redux';
// import sequence from './sequence'
import {
  ADD_SEQUENCE,
  REMOVE_SEQUENCE,
  UPDATE_SEQUENCE,
  CHANGE_BPM,
  TOGGLE_PLAYING
} from '../actions/types';
import initialSequences from '../data';

// pass this function into a call to Array.prototype.reduce
const nextId = (maxId, sequence) => Math.max(sequence.id, maxId);

const defaultTones = {
  // from beatDefs
  bell: 200,
  conga: 200,
  membrane: 'Bb4',
  metal: 200
  // from TR808: they are all 0
};

const sequences = (state = initialSequences, action) => {
  switch (action.type) {
    case ADD_SEQUENCE: {
      const newId = state.reduce(nextId, -1) + 1;
      const newSequence = Object.assign(
        action.sequence,
        { id: newId }
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
          const tone = defaultTones[soundDef] || 0;

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

export default combineReducers({
  sequences,
  bpm,
  playing
});

export { sequences, bpm, playing };
