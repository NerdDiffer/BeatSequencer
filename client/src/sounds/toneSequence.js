import { Sequence } from 'tone';

/**
 * Create a Tone.Sequence object.
 * For details, see: https://tonejs.github.io/docs/#Sequence
 *
 * @param { tone }, A note to play on every event
 *   If the sound definition (`def`) is a MembraneSynth, then pass a note
 *   string, such as: `Bb4`. Again, consult the ToneJS docs for details.
 *   If the sound defintion is a MetalSynth, pass a frequency, such as: `200`.
 *   Consult ToneJS docs for more info.
 * @param { def }, Sound definition. Could be something like a
 *   Tone.MembraneSynth, Tone.MetalSynth object
 * @param events, {Array} sequence of events to play
 * @param subdivision, {String}, subdivision between which events are placed.
 */
const sequence = ({ tone, def }, events, subdivision) => {
  const toneEvents = events.map(event => {
    if (event === 0) {
      return null;
    } else {
      return event;
    }
  });

  return new Sequence(time => {
    def.triggerAttackRelease(tone);
  }, toneEvents, subdivision);
};

export default sequence;
