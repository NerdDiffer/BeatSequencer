import {
  CHANGE_TONE,
  CHANGE_SOUND_DEF,
  CHANGE_EVENTS,
  CHANGE_SUBDIVISION
} from './types';

// TODO: best way to identify a sequence within BeatSequencer.sequences array?
// let nextSequenceId = 0

export const changeTone = tone => (
  {
    type: CHANGE_TONE,
    tone
  }
);

export const changeSoundDef = soundDef => (
  {
    type: CHANGE_SOUND_DEF,
    soundDef
  }
);

export const changeEvents = events => (
  {
    type: CHANGE_EVENTS,
    events
  }
);

export const changeSubdivision = subdivision => (
  {
    type: CHANGE_SUBDIVISION,
    subdivision
  }
);
