import {
  ADD_SEQUENCE,
  REMOVE_SEQUENCE,
  CHANGE_BPM,
  TOGGLE_PLAYING
} from './types';

export const addSequence = sequence => {
  return {
    type: ADD_SEQUENCE,
    sequence
  };
};

export const removeSequence = id => {
  return {
    type: REMOVE_SEQUENCE,
    id
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

export const getAllSequences = () => {
  return {
    type: 'default'
  };
};
