// Having trouble getting tests to work with 'import' keyword.
// TODO: configure karma + webpack to allow it.

const expect = require('expect');
const Tone = require('tone');

const ToneWrapper = require('../../client/src/sounds/ToneJS/ToneWrapper').default;

describe('ToneWrapper', () => {
  describe('#constructor', () => {
    let subject;

    beforeEach(() => subject = new ToneWrapper([]));

    it('returns an instance of ToneWrapper', () => {
      expect(subject).toBeA(ToneWrapper);
    });

    xit('calls mapSequencesById', () => {
      const spy_initTone = expect.createSpy(initTone);
      const spy_setTransportBPM = expect.createSpy(setTransportBPM);
      spy_initTone.andCall(spy_setTransportBPM);

      spy_initTone({ sequences: [], bpm });

      expect(spy_setTransportBPM).toHaveBeenCalled();

      expect.restoreSpies();
    });
  });

  describe('#start', () => {
    let subject;

    beforeEach(() => subject = new ToneWrapper([]));

    it('calls Tone.Transport.start', () => {
      const spy_start = expect.createSpy(subject.start);
      const spy_TransportStart = expect.createSpy(Tone.Transport.start);
      spy_start.andCall(spy_TransportStart);

      spy_start();

      expect(spy_TransportStart).toHaveBeenCalled();

      expect.restoreSpies();
    });

    it('calls start on the subject\'s sequence');
  });

  describe('#stop', () => {
    let subject;

    beforeEach(() => subject = new ToneWrapper([]));

    it('calls Tone.Transport.stop', () => {
      const spy_stop = expect.createSpy(subject.stop);
      const spy_TransportStop = expect.createSpy(Tone.Transport.stop);
      spy_stop.andCall(spy_TransportStop);

      spy_stop();

      expect(spy_TransportStop).toHaveBeenCalled();

      expect.restoreSpies();
    });

    it('calls stop on the subject\'s sequence');
  });
});
