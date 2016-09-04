import expect from 'expect'
import rootReducer, {
  sequences,
  bpm,
  playing
} from '../../client/src/reducers';

import {
  ADD_SEQUENCE,
  REMOVE_SEQUENCE,
  UPDATE_SEQUENCE,
  CHANGE_BPM,
  TOGGLE_PLAYING
} from '../../client/src/actions/types';

//const testIndex = store => {
//  store.dispatch(addSequence(1));
//  store.dispatch(addSequence(2));
//  store.dispatch(addSequence(3));
//  store.dispatch(removeSequence(3));
//  store.dispatch(removeSequence(2));
//  store.dispatch(removeSequence(1));
//  store.dispatch(changeBPM(80));
//  store.dispatch(togglePlaying());
//};

describe('Beat Sequencer Reducer', () => {
  describe('sequences', () => {
    let testSequence1;
    let testSequence2;
    let testSequences;

    beforeEach(() => {
      testSequence1 = { id: 1 };
      testSequence2 = { id: 2 };
      testSequences = [testSequence1];
    });

    it('should provide the initial state', () => {
      expect(sequences(undefined, {})).toEqual([])
    });

    it('should handle ADD_SEQUENCE action', () => {
      var action = {
        type: ADD_SEQUENCE,
        sequence: testSequence2
      };
      var actual = sequences(testSequences, action);
      var expected = testSequences.concat(testSequence2);

      expect(actual).toEqual(expected)
    });

    it('should handle REMOVE_SEQUENCE action', () => {
      testSequences = testSequences.concat(testSequence2);
      var action = { type: REMOVE_SEQUENCE, id: 1 };
      var actual = sequences(testSequences, action);
      expect(actual).toEqual([testSequence2])
    });

    it('should handle UPDATE_SEQUENCE action', () => {
      testSequences = testSequences.concat(testSequence2);
      var newSequence1 = {
        id: 1,
        tone: 'foo',
        soundDef: 'bar',
        events: [1,1,1,1],
        subdivision: '8n'
      };

      var action = {
        type: UPDATE_SEQUENCE,
        sequence: {
          id: 1,
          tone: newSequence1.tone,
          soundDef: newSequence1.soundDef,
          events: newSequence1.events,
          subdivision: newSequence1.subdivision
        }
      };
      var actual = sequences(testSequences, action);
      var expected = [newSequence1, testSequence2];
      expect(actual).toEqual(expected);
    });

    it('should ignore unknown actions', () => {
      var action = { type: 'unknown' };
      var actual = sequences(testSequences, action);
      expect(actual).toEqual(testSequences);
    });
  });
});
