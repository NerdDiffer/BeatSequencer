import React, { Component } from 'react';
import { Transport } from 'tone';
import Sequence from './Sequence';
import PlayStopButton from './PlayStopButton';
import AddSequenceButton from './AddSequenceButton';
import TempoSlider from './TempoSlider';

/**
 * logic of:
 * - changing BPM
 * - beat grouping
 * - pass sounds to sequence
 */
class BeatSequencer extends Component {
  constructor(props) {
    super(props);

    const bpm = 120;
    Transport.bpm.value = bpm;

    this.togglePlaying = this.togglePlaying.bind(this);
    this.changeBPM = this.changeBPM.bind(this);
    this.addSequence = this.addSequence.bind(this);
    this.removeSequence = this.removeSequence.bind(this);
  }

  togglePlaying() {
    const { actions } = this.props;
    actions.togglePlaying();

    if (Transport.state !== 'started') {
      Transport.start();
    } else {
      Transport.stop();
    }
  }

  changeBPM(_event, value) {
    const { actions } = this.props;
    actions.changeBPM(value);

    Transport.bpm.value = value;
  }

  addSequence() {
    const { actions } = this.props;
    const newSequence = {
      tone: 'Bb4',
      soundDef: 'membrane',
      events: [1,1,1,1],
      subdivision: '4n'
    };

    actions.addSequence(newSequence);
  }

  removeSequence(sequenceId) {
    const { actions } = this.props;

    actions.removeSequence({ id: sequenceId });
  }

  render() {
    const removeSequence = this.removeSequence;
    const renderSequences = () => {
      const { sequences, isPlaying, actions } = this.props;

      return sequences.map((sequence, index) => {
        const removeThisSequence = removeSequence.bind(null, sequence.id);

        return (
          <Sequence
            isPlaying={isPlaying}
            key={index}
            handleClick={removeThisSequence}
            actions={actions}
            id={sequence.id}
            tone={sequence.tone}
            soundDef={sequence.soundDef}
            events={sequence.events}
            subdivision={sequence.subdivision}
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
