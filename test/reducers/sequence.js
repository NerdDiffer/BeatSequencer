import expect from 'expect'
import rootReducer, {
  tone,
  soundDef,
  events,
  subdivision
} from '../../client/src/reducers/sequence';

import {
  CHANGE_TONE,
  CHANGE_SOUND_DEF,
  CHANGE_EVENTS,
  CHANGE_SUBDIVISION
} from '../../client/src/actions/types';

describe('Sequence Reducer', () => {
  const foo = 'foo';
  const bar = 'bar';

  describe('tone', () => {
    it('should provide the initial state', () => {
      expect(tone(undefined, {})).toEqual('Bb4')
    });

    it('should handle CHANGE_TONE action', () => {
      var action = {
        type: CHANGE_TONE,
        tone: bar
      };
      var actual = tone(foo, action);

      expect(actual).toEqual(bar);
    });

    it('should ignore unknown actions', () => {
      var action = { type: 'unknown' };
      var actual = tone(foo, action);
      expect(actual).toEqual(foo);
    });
  });

  describe('soundDef', () => {
    it('should provide the initial state', () => {
      expect(soundDef(undefined, {})).toEqual('membrane')
    });

    it('should handle CHANGE_SOUND_DEF action', () => {
      var action = {
        type: CHANGE_SOUND_DEF,
        soundDef: bar
      };
      var actual = soundDef(foo, action);

      expect(actual).toEqual(bar);
    });

    it('should ignore unknown actions', () => {
      var action = { type: 'unknown' };
      var actual = soundDef(foo, action);
      expect(actual).toEqual(foo);
    });
  });

  describe('events', () => {
    const defaultEvents = [1, 0, 0, 1];

    it('should provide the initial state', () => {
      expect(events(undefined, {})).toEqual(defaultEvents)
    });

    it('should handle CHANGE_EVENTS action', () => {
      const newEvents = [0, 1, 1, 0];
      var action = {
        type: CHANGE_EVENTS,
        events: newEvents
      };
      var actual = events(defaultEvents, action);

      expect(actual).toEqual(newEvents);
    });

    it('should ignore unknown actions', () => {
      var action = { type: 'unknown' };
      var actual = events(defaultEvents, action);
      expect(actual).toEqual(defaultEvents);
    });
  });

  describe('subdivision', () => {
    it('should provide the initial state', () => {
      expect(subdivision(undefined, {})).toEqual('4n')
    });

    it('should handle CHANGE_SUBDIVISION action', () => {
      var action = {
        type: CHANGE_SUBDIVISION,
        subdivision: bar
      };
      var actual = subdivision(foo, action);

      expect(actual).toEqual(bar);
    });

    it('should ignore unknown actions', () => {
      var action = { type: 'unknown' };
      var actual = subdivision(foo, action);
      expect(actual).toEqual(foo);
    });
  });
});
