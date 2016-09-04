import { combineReducers } from 'redux';
//import sequence from './sequence'
import {
  ADD_SEQUENCE,
  REMOVE_SEQUENCE,
  UPDATE_SEQUENCE,
  CHANGE_BPM,
  TOGGLE_PLAYING
} from '../actions/types';

const initialSequences = [
  {
    id: 0,
    tone: '200',
    soundDef: 'bell',
    events: [1, 0, 0, 0],
    subdivision: '4n'
  },
  {
    id: 1,
    tone: '200',
    soundDef: 'conga',
    events: [0, 1, 0, 0],
    subdivision: '4n'
  },
  {
    id: 2,
    tone: 'Bb4',
    soundDef: 'membrane',
    events: [0, 0, 1, 0],
    subdivision: '4n'
  },
  {
    id: 3,
    tone: '200',
    soundDef: 'metal',
    events: [0, 0, 0, 1],
    subdivision: '4n'
  }
];

const sequences = (state = initialSequences, action) => {
  switch (action.type) {
    case ADD_SEQUENCE:
      return [
        ...state,
        action.sequence
      ];
    case REMOVE_SEQUENCE:
      return state.filter((sequence) => sequence.id !== action.id);
    case UPDATE_SEQUENCE:
      const update = sequence => {
        if (sequence.id !== action.sequence.id) {
          return sequence
        } else {
          const { tone, soundDef, events, subdivision } = action.sequence;

          return Object.assign(
            {},
            sequence,
            { tone, soundDef, events, subdivision }
          );
        }
      };

      return state.map(update);
    default:
      return state
  }
};

const bpm = (state = 120, action) => {
  switch(action.type) {
    case CHANGE_BPM:
      return action.bpm;
    default:
      return state;
  }
};

const playing = (state = false, action) => {
  switch(action.type) {
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
