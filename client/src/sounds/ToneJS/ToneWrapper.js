import { Buffer, Transport } from 'tone';
import createSampler from './createSampler';
import createSequence from './createSequence';
import {
  mapSequencesById,
  buildSamplers,
  instrumentEventsToMatrix,
  matrixToInstrumentEvents
} from './helpers';

class ToneWrapper {
  constructor(sequences) {
    this.instrumentData = mapSequencesById(sequences);
    this.samplers = buildSamplers(this.instrumentData);
    this.beatMatrix = instrumentEventsToMatrix(this.instrumentData);
    this.sequence = createSequence(this);
  }

  start() {
    this.sequence.start();
    Transport.start();
  }

  stop() {
    this.sequence.stop();
    Transport.stop();
  }

  /**
   * Update properties:
   * - add data `instrumentData` so it can be read from `this.sequence`
   * - add the new sampler to `samplers`
   * - add beats of the new sampler to `beatMatrix`
   * - then use updated properties to set `sequence`
   */
  addSampler(newestSequence) {
    const { id, soundDef } = newestSequence;

    this.instrumentData[id] = newestSequence;

    const sampler = createSampler(soundDef);

    Buffer.on('load', () => {
      this.samplers[id] = sampler;

      // it's easier to re-assign beatMatrix after updating information
      this.beatMatrix = instrumentEventsToMatrix(this.instrumentData);
    });
  }

  /**
   * Update properties:
   * - remove data from `instrumentData`
   * - remove a sampler from `samplers` and dispose of it so the ToneJS library
   *   can properly clean up
   * - remove beats of sampler from `beatMatrix` (overwrite)
   * - then use updated properties to set `sequence`
   */
  removeSampler(id) {
    // just mutate `samplers`, `instrumentData` in place
    delete this.instrumentData[id];
    // TODO: figure out if there is an implicit reference to old sampler when
    // calling dispose? For some reason or another the first sequence you
    // remove will continue to be in collection collection, `this.samplers`
    // this.samplers[id].dispose();
    delete this.samplers[id];

    // it's easier to re-assign beatMatrix after updating information
    this.beatMatrix = instrumentEventsToMatrix(this.instrumentData);
  }

  /**
   * Invoked when you want to change the sound definition of a Tone.Sampler obj.
   * Modify the `samplers` property, by replacing the currently-selected
   * sampler with a new instance. The reason for replacing the sampler instance
   * is that it is marked as 'read-only'.
   * ToneJS won't let you edit it. So overwrite it instead.
   */
  replaceSampler(soundDef, id) {
    const replacementSampler = createSampler(soundDef);

    // Inside of ToneJS, you *might* need to remove lingering references to
    // the old sampler. The `dispose` method might work.

    Buffer.on('load', () => {
      this.samplers[id] = replacementSampler;
      this.instrumentData[id].soundDef = soundDef;
    })
  }

  muteSampler(id) {
    const sampler = this.samplers[id];
    const newValue = !sampler.player.mute;
    sampler.player.mute = newValue;
    this.instrumentData[id].mute = newValue;
  }

  /**
   * Modify the `beatMatrix` property by grabbing the location of beat and the
   * sample which requests a change. Toggle it.
   */
  updateBeatMatrix(beatIndex, sampleIndex) {
    const currentValue = this.beatMatrix[beatIndex][sampleIndex];
    const newValue = currentValue === 1 ? null : 1;
    const newEvents = matrixToInstrumentEvents(this.beatMatrix, sampleIndex);

    this.beatMatrix[beatIndex][sampleIndex] = newValue;
    this.instrumentData[sampleIndex].events = newEvents;
  }
}

export default ToneWrapper;
