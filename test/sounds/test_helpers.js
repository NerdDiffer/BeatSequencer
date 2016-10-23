// Having trouble getting tests to work with 'import' keyword.
// TODO: configure karma + webpack to allow it.

const expect = require('expect');
const Tone = require('tone');

const createSampler = require('../../client/src/sounds/ToneJS/createSampler').default;
const {
  mapSequencesById,
  buildSamplers,
  instrumentEventsToMatrix,
  matrixToInstrumentEvents
} = require('../../client/src/sounds/ToneJS/helpers');
const { forEachInObj } = require('../../client/src/utils');

describe('ToneWrapper helpers', () => {
  describe('mapSequencesById', () => {
    const sequences = [
      { id: 1, foo: 'bar', bar: 'qux' },
      { id: 2, bar: 'foo', qux: 'bar' }
    ];
    let result;

    beforeEach(() => {
      result = mapSequencesById(sequences);
    });

    xit('creates a deep clone of the input', () => {
      // TODO: spy on deepClone instead
      result['qux'] = { troll: true };

      const expected = [
        { id: 1, foo: 'bar', bar: 'qux' },
        { id: 2, bar: 'foo', qux: 'bar' }
      ];

      expect(sequences).toEqual(expected);
    });

    it('maps the input array to an object', () => {
      const expected = {
        1: { id: 1, foo: 'bar', bar: 'qux' },
        2: { id: 2, bar: 'foo', qux: 'bar' }
      };

      expect(result).toEqual(expected);
    });
  });

  xdescribe('buildSamplers', () => {
    class MockSampler {
      constructor(soundDef) {
        this.soundDef = soundDef;
      }
    }

    let spy_createSampler;
    let mockSampler = new MockSampler('bar');

    const instrumentData = {
      'deadbeef': { id: 'deadbeef', soundDef: 'foo', qux: 'bar' },
      'fa1afe1': { id: 'falafel', soundDef: 'bar', bar: 'qux' }
    };

    beforeEach(() => {
      spy_createSampler = expect.createSpy(createSampler).andReturn(mockSampler);
    });

    it('calls createSampler', () => {
      const spy_buildSamplers = expect.createSpy(buildSamplers);
      spy_buildSamplers.andCall(spy_createSampler);

      spy_buildSamplers(instrumentData);

      expect(spy_createSampler).toHaveBeenCalled();
      expect.restoreSpies();
    });

    it('returns collection where each key is the id of the sampler', () => {
      const result = buildSamplers(instrumentData);
      expect(result).toIncludeKeys(['deadbeef', 'fa1afe1']);
    });

    it('returns collection where each value is a sampler object', () => {
      const result = buildSamplers(instrumentData);

      forEachInObj(result, sampler => {
        const actual = sampler.constructor;
        expect(actual).toEqual(Tone.Sampler);
      });
    });
  });

  describe('instrumentEventsToMatrix', () => {
    it('returns an empty object when passed undefined')
    it('calls transpose')
    it('produces an object in this shape') // TODO: run the code & look at shape
  });

  describe('matrixToInstrumentEvents', () => {
  });
});
