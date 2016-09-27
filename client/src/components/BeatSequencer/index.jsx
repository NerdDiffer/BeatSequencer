import React, { Component } from 'react';
import Sequence from './Sequence';
import PlayStopButton from './PlayStopButton';
import AddSequenceButton from './AddSequenceButton';
import TempoSlider from './TempoSlider';
import initTone, { setTransportBPM, exposeTone } from '../../sounds/ToneJS';
import { forEachInObj } from '../../utils';

/**
 * Build a collection of new sequences by comparing the ids of the current
 * sequences against ids in collection of next sequences.
 */
const idNewSequences = (currentSequences, nextSequences) => {
  const currentIds = currentSequences.reduce((collection, sequence) => {
    const key = sequence.id;
    collection[key] = true;
    return collection;
  }, {});

  return nextSequences.reduce((collection, sequence) => {
    const id = sequence.id;
    // if the id is not present in list of currently active sequences...
    if (!currentIds.hasOwnProperty(id)) {
      collection[id] = sequence;
    }
    return collection;
  }, {});
};

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
    this._tone = initTone(this.props);
    exposeTone(this._tone);
  }

  componentWillReceiveProps(nextProps) {
    const nextSequences = nextProps.sequences;
    const nextLen = nextSequences.length

    if (nextLen > 0) {
      const newSequences = idNewSequences(this.props.sequences, nextSequences);
      forEachInObj(newSequences, sequence => this._tone.addSampler(sequence));
    }
  }

  togglePlaying() {
    const { actions } = this.props;
    actions.togglePlaying();

    const isPlaying = this.props.isPlaying;
    // console.log('before toggle, is it playing?', isPlaying);

    if (!isPlaying) {
      this._tone.start();
    } else {
      this._tone.stop();
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
    this._tone.removeSampler(sequenceId);
    actions.removeSequence({ id: sequenceId });
  }

  onBeatToggle(beatIndex, sampleIndex) {
    this._tone.updateBeatMatrix(beatIndex, sampleIndex);
  }

  onEditSoundDef(soundDef, id) {
    this._tone.replaceSampler(soundDef, id);
  }

  onMuteToggle(id) {
    this._tone.muteSampler(id);
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
