import {
  CHANGE_TONE,
  CHANGE_SOUND_DEF,
  CHANGE_EVENTS,
  CHANGE_SUBDIVISION
} from './types';

// TODO: best way to identify a sequence within BeatSequencer.sequences array?
let nextSequenceId = 0

export const changeTone = (tone) => {
  return {
    type: CHANGE_TONE,
    tone
  };
};

export const changeSoundDef = (soundDef) => {
  return {
    type: CHANGE_SOUND_DEF,
    soundDef
  };
};

export const changeEvents = (events) => {
  return {
    type: CHANGE_EVENTS,
    events
  };
};

export const changeSubdivision = (subdivision) => {
  return {
    type: CHANGE_SUBDIVISION,
    subdivision
  };
};
