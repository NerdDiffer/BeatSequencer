// Having trouble getting tests to work with 'import' keyword.
// TODO: configure karma + webpack to allow it.

const expect = require('expect');
const Tone = require('tone');

const toneInterface = require('../../client/src/sounds/ToneJS');
const ToneWrapper = require('../../client/src/sounds/ToneJS/ToneWrapper').default;

const initTone = toneInterface.default;
const { setTransportBPM, exposeTone } = toneInterface;

describe('Tone index', () => {
  describe('initTone', () => {
    const bpm = 100;

    it('returns an instance of ToneWrapper', () => {
      const instance = initTone({ sequences: [] });
      const actual = instance.constructor;
      expect(actual).toBe(ToneWrapper);
    });

    it('calls setTransportBPM', () => {
      const spy_initTone = expect.createSpy(initTone);
      const spy_setTransportBPM = expect.createSpy(setTransportBPM);
      spy_initTone.andCall(spy_setTransportBPM);

      spy_initTone({ sequences: [], bpm });

      expect(spy_setTransportBPM).toHaveBeenCalled();

      expect.restoreSpies();
    });

    it('calls Transport.start', () => {
      const spy_initTone = expect.createSpy(initTone);
      const spy_TransportStart = expect.createSpy(Tone.Transport.start);
      spy_initTone.andCall(spy_TransportStart);

      spy_initTone({ sequences: [], bpm });

      expect(spy_TransportStart).toHaveBeenCalled();

      expect.restoreSpies();
    });
  });

  describe('setTransportBPM', () => {
    it('sets bpm.value on Tone.Transport', () => {
      const actual = setTransportBPM(100);
      expect(actual).toBe(100);
    });
  });

  describe('exposeTone', () => {
    afterEach(() => {
      window._tone = undefined;
      window.Transport = undefined;
      window.Tone = undefined;
    });

    it('exposes these properties on the window object', () => {
      const mockToneObject = {};
      exposeTone(mockToneObject);

      expect(window._tone).toBe(mockToneObject);
      expect(window.Transport).toBe(Tone.Transport);
      expect(window.Tone).toBe(Tone);
    });
  });
});
