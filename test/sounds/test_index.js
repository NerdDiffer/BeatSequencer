import mock from 'mock-require';
import expect from 'expect';
const Tone = {
  Sampler: function() { },
  Sequence: function() { },
  Transport: { bpm: { value: 120 } }
};
mock('tone', Tone);

// Synchronously load anything that needs to use 'tone' library because
// using 'import' (asynchronous) messes up the mocking config.
const ToneSampler = require('../../client/src/sounds/ToneJS/ToneSampler.js');
const toneInterface = require('../../client/src/sounds/ToneJS');
import sounds from '../../client/src/sounds';

const { setTransportBPM, createSampler, init } = toneInterface;

describe('ToneJS wrapper interface', () => {
  describe('setTransportBPM', () => {
    it('sets bpm.value on Tone.Transport', () => {
      const actual = setTransportBPM(130);
      expect(actual).toBe(130);
    });
  });

  describe('createSampler', () => {
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
});

describe('sound modules', () => {
  describe('TR808', () => {
    const { TR808 } = sounds;

    context('when passed an existing value', () => {
      it('returns the URL of a sound', () => {
        expect(TR808['HiHat.Open']).toBeA('string');
      });
    });

    context('when passed a non-existing value', () => {
      it('returns undefined', () => {
        expect(TR808['foobar']).toBe(undefined);
      });
    });
  });
});
