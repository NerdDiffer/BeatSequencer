import {
  ADD_SEQUENCE,
  REMOVE_SEQUENCE,
  UPDATE_SEQUENCE,
  CHANGE_BPM,
  TOGGLE_PLAYING
} from './types';

export const addSequence = sequence => {
  return {
    type: ADD_SEQUENCE,
    sequence
  };
};

export const removeSequence = sequence => {
  return {
    type: REMOVE_SEQUENCE,
    id: sequence.id
  };
};

export const updateSequence = sequence => {
  return {
    type: UPDATE_SEQUENCE,
    sequence
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
