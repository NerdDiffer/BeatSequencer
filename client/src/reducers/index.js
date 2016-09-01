import { combineReducers } from 'redux';
//import sequence from './sequence'
import {
  ADD_SEQUENCE,
  REMOVE_SEQUENCE,
  CHANGE_BPM,
  TOGGLE_PLAYING
} from '../actions/types';

const sequences = (state = [], action) => {
  switch (action.type) {
    case ADD_SEQUENCE:
      return [
        ...state,
        action.sequenceId
      ];
    case REMOVE_SEQUENCE:
      return state.filter((sequenceId) => sequenceId !== action.sequenceId);
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
