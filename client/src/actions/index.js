import {
  ADD_SEQUENCE,
  REMOVE_SEQUENCE,
  UPDATE_SEQUENCE,
  CHANGE_BPM,
  TOGGLE_PLAYING
} from './types';

export const addSequence = sequence => (
  {
    type: ADD_SEQUENCE,
    sequence
  }
);

export const removeSequence = sequence => (
  {
    type: REMOVE_SEQUENCE,
    id: sequence.id
  }
);

export const updateSequence = sequence => (
  {
    type: UPDATE_SEQUENCE,
    sequence
  }
);

export const changeBPM = bpm => (
  {
    type: CHANGE_BPM,
    bpm
  }
);

export const togglePlaying = () => (
  {
    type: TOGGLE_PLAYING
  }
);

export const getAllSequences = () => (
  {
    type: 'default'
  }
);
