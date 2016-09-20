import Tone, { Transport } from 'tone';
import ToneWrapper from './ToneWrapper';

const setTransportBPM = (bpm = 120) => {
  return Transport.bpm.value = bpm;
};

/**
 * Pass in an object with these properties:
 *   @param bpm, {Integer} beats per minute, passed in to component via props
 *   @param sequences, {Array} the sequences, passed in to component via props
 */
const initTone = ({ bpm, sequences }) => {
  const toneWrapper = new ToneWrapper(sequences);

  // initialize tempo & set Tone.Transport to start
  setTransportBPM(bpm);
  Transport.start();

  return toneWrapper;
};

// Use this for live troubleshooting
const exposeTone = toneObj => {
  window._tone = toneObj;
  window.Transport = Transport;
  window.Tone = Tone;
};

export default initTone;
export { setTransportBPM, exposeTone };
