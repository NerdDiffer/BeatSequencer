import {
  ADD_SEQUENCE,
  REMOVE_SEQUENCE,
  CHANGE_BPM,
  TOGGLE_PLAYING
} from './types';

export const addSequence = sequenceId => {
  return {
    type: ADD_SEQUENCE,
    sequenceId
  };
};

export const removeSequence = sequenceId => {
  return {
    type: REMOVE_SEQUENCE,
    sequenceId
  };
};

export const changeBPM = bpm => {
  return {
    type: CHANGE_BPM,
    bpm
  };
};

export const togglePlaying = () => {
  return {
    type: TOGGLE_PLAYING
  };
};
