import { Sequence } from 'tone';
import soundDefs from '../';
import { pathToSoundFile } from '../../utils';
import ToneSampler from './ToneSampler';

const { TR808 } = soundDefs;

const mapSound = soundDef => {
  if (TR808[soundDef]) {
    const soundUrl = pathToSoundFile(TR808[soundDef]);
    return ToneSampler(soundUrl);
  }
};

const targetEvents = event => {
  if (Array.isArray(event)) {
    // handle subdivisions, represented by nested arrays
    return event.map(e => targetEvents(e));
  } else if (event === 0) {
    return null;
  } else {
    return event;
  }
};

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
const ToneSequence = ({ tone, soundDef, events, subdivision, mute }) => {
  const sound = mapSound(soundDef);
  const toneEvents = events.map(targetEvents);

  const sequence = new Sequence(time => {
    sound.triggerAttackRelease(tone);
  }, toneEvents, subdivision);

  if (mute) {
    sequence.mute = true;
  }

  return sequence;
};

export default ToneSequence;
