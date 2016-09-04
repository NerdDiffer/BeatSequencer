import { combineReducers } from 'redux';
import {
  CHANGE_TONE,
  CHANGE_SOUND_DEF,
  CHANGE_EVENTS,
  CHANGE_SUBDIVISION
} from '../actions/types';

const tone = (state = 'Bb4', action) => {
  switch(action.type) {
    case CHANGE_TONE:
      return action.tone;
    default:
      return state;
  }
};

const soundDef = (state = 'membrane', action) => {
  switch(action.type) {
    case CHANGE_SOUND_DEF:
      return action.soundDef;
    default:
      return state;
  }
};

const events = (state = [1, 0, 0, 1], action) => {
  switch(action.type) {
    case CHANGE_EVENTS:
      return action.events;
    default:
      return state;
  }
};

const subdivision = (state = '4n', action) => {
  switch(action.type) {
    case CHANGE_SUBDIVISION:
      return action.subdivision;
    default:
      return state;
  }
};

export default combineReducers({
  tone,
  soundDef,
  events,
  subdivision
});

export { tone, soundDef, events, subdivision };
