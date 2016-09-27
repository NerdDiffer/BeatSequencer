import React, { Component } from 'react';
import { Transport, Buffer } from 'tone';
import Sequence from './Sequence';
import PlayStopButton from './PlayStopButton';
import AddSequenceButton from './AddSequenceButton';
import TempoSlider from './TempoSlider';
import {
  setTransportBPM,
  createSampler,
  init as initTone
} from '../../sounds/ToneJS';

/**
 * logic of:
 * - changing BPM
 * - beat grouping
 * - pass sounds to sequence
 */
class BeatSequencer extends Component {
  constructor(props) {
    super(props);

    this.togglePlaying = this.togglePlaying.bind(this);
    this.changeBPM = this.changeBPM.bind(this);
    this.addSequence = this.addSequence.bind(this);
    this.removeSequence = this.removeSequence.bind(this);
    this.onBeatToggle = this.onBeatToggle.bind(this);
    this.onEditSoundDef = this.onEditSoundDef.bind(this);
    this.onMuteToggle = this.onMuteToggle.bind(this);

    // all audio-related things start here
    this._tone = {};
    initTone(this._tone, this.props);
  }

  componentWillReceiveProps(nextProps) {
    const currentSequences = this.props.sequences;
    const nextSequences = nextProps.sequences;

    const lastSequence = currentSequences[currentSequences.length - 1];
    const newestSequence = nextSequences[nextSequences.length - 1];

    if (lastSequence.id !== newestSequence.id) {
      const { soundDef, events } = newestSequence;
      /**
       * Update properties on `this._tone`
       * - add the new sampler to `_tone.samplers`
       * - add beats of the new sampler to `_tone.beatMatrix`
       * - add data `_tone.instrumentData` so it can be read from the sequence
       */
      const sampler = createSampler(soundDef);
      this._tone.samplers.push(sampler);

      events.forEach((val, ind) => {
        this._tone.beatMatrix[ind].push(val);
      });

      this._tone.instrumentData.push(newestSequence);
    }
  }

  togglePlaying() {
    const { actions } = this.props;
    actions.togglePlaying();

    if (!this.props.isPlaying) {
      this._tone.sequence.start();
    } else {
      this._tone.sequence.stop();
    }
  }

  changeBPM(_event, value) {
    const { actions } = this.props;
    actions.changeBPM(value);
    setTransportBPM(value);
  }

  addSequence() {
    const { actions } = this.props;
    actions.addSequence();
  }

  removeSequence(sequenceId) {
    const { actions } = this.props;
    // Inside of ToneJS, clean up lingering references to this Sampler object
    this._tone.samplers[sequenceId].dispose();
    this._tone.samplers[sequenceId] = null;
    actions.removeSequence({ id: sequenceId });
    // TODO:
    // - might be a better idea to remove it from `_tone.samplers` instead
    //   of setting it to `null`
    // - remove beats of the sampler from `_tone.beatMatrix`
    // - remove reference from `_tone.instrumentData`
  }

  /**
   * Modify the internal `beatMatrix` property by grabbing the location of beat
   * and the sample which requests a change. Toggle it.
   */
  onBeatToggle(beatIndex, sampleIndex) {
    const currentState = this._tone.beatMatrix[beatIndex][sampleIndex];
    const newState = currentState === 1 ? null : 1;
    this._tone.beatMatrix[beatIndex][sampleIndex] = newState;
  }

  /**
   * Modify the internal `samplers` property, by replacing the
   * currently-selected sampler with a new instance. The reason for replacing
   * the sampler instance is that it is marked as 'read-only'. ToneJS won't let
   * you edit it. So overwrite it instead.
   */
  onEditSoundDef(soundDef, id) {
    const currentSampler = this._tone.samplers[id];
    const replacementSampler = createSampler(soundDef);

    // Inside of ToneJS, you *might* need to remove lingering references to
    // the old sampler. The `dispose` method might work. Though, am having
    // problem when invoking it, says "cannot set playbackRate of null".
    // It does not appear to be necessary to dispose of the old sample anyways.
    // Though, have not tested this with a large number of active samples.
    // this.samplers[id].dispose();
    Buffer.on('load', () => {
      this._tone.samplers[id] = replacementSampler;
    })
  }

  /**
   * Modify the internal `samplers` property, by toggling the `mute` property
   * on the selected sampler
   */
  onMuteToggle(id) {
    const sampler = this._tone.samplers[id];
    sampler.player.mute = !sampler.player.mute;
  }

  render() {
    const removeSequence = this.removeSequence;
    const renderSequences = () => {
      const { sequences, isPlaying, actions } = this.props;

      return sequences.map((sequence, index) => {
        const { id, tone, soundDef, events, subdivision, mute } = sequence;
        const removeThisSequence = removeSequence.bind(null, id);

        return (
          <Sequence
            isPlaying={isPlaying}
            key={index}
            handleClick={removeThisSequence}
            actions={actions}
            id={id}
            tone={tone}
            soundDef={soundDef}
            events={events}
            subdivision={subdivision}
            mute={mute}
            toggleBeat={this.onBeatToggle}
            editSoundDef={this.onEditSoundDef}
            toggleMute={this.onMuteToggle}
          />
        );
      });
    };

    return (
      <div className="beatSequencer">
        <div className="controls">
          <h2>Controls</h2>
          <PlayStopButton
            isPlaying={this.props.isPlaying}
            handleClick={this.togglePlaying}
          />
          <TempoSlider
            bpm={this.props.bpm}
            changeBPM={this.changeBPM}
          />
          Tempo: { this.props.bpm } bpm
        </div>
        <hr />
        <div className="sequences">
          <h2>Sequences</h2>
          { renderSequences() }
          <AddSequenceButton handleClick={this.addSequence} />
        </div>
      </div>
    );
  }
}

export default BeatSequencer;
