// Having trouble getting tests to work with 'import' keyword.
// TODO: configure karma + webpack to allow it.

const expect = require('expect');
const Tone = require('tone');
const createSampler = require('../../client/src/sounds/ToneJS/createSampler').default;

describe('Tone.createSampler', () => {
  context('when passed a valid value for soundDef', () => {
    it('returns an instance of ToneSampler', () => {
      const actual = createSampler('BassDrum');
      expect(actual).toBeA(Tone.Sampler);
    });
  });

  context('when passed an invalid value for soundDef', () => {
    it('returns undefined', () => {
      const actual = createSampler('foobar');
      expect(actual).toBe(undefined);
    });
  });
});
