import React, { Component } from 'react';
import Row from './Row';
import MuteButton from './MuteButton';
import EditSequence from './EditSequence';
import RemoveSequenceButton from './RemoveSequenceButton';
import toneSequence from '../../instruments/beats/sequence';
import beatSounds from '../../instruments/sounds/tick';

/**
 * - toggles active sounds on a subdivision
 *   (generates a pattern based on user interaction)
 * - groups a beat (start with an easy default)
 * - renders a dumb row
 */
class Sequence extends Component {
  constructor(props) {
    super(props);

    const defaultEvents = [1, 0, 0, 1];
    const defaultSubdivision = '4n';
    const sound = { tone: 'Bb4', def: beatSounds.membrane };

    this.state = {
      sound,
      sequence: toneSequence(sound, defaultEvents, defaultSubdivision),
      events: defaultEvents, // events for ToneSequence object
      subdivision: defaultSubdivision,
      isMute: false,
      showPopover: false
    };

    this.toggleBeat = this.toggleBeat.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.closePopover = this.closePopover.bind(this);
    this.selectSequence = this.selectSequence.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const willBePlaying = nextProps.isPlaying;

    if (willBePlaying) {
      this.state.sequence.start();
    } else {
      this.state.sequence.stop();
    }
  }

  toggleBeat(index) {
    const events = this.state.events;
    const newValue = events[index] === 0 ? 1 : 0;
    const newEvents = [
      ...events.slice(0, index),
      newValue,
      ...events.slice(index + 1)
    ];

    const newSequence = toneSequence(this.state.sound, newEvents, this.state.subdivision);

    this.setState({
      events: newEvents,
      sequence: newSequence
    });
  }

  toggleMute() {
    const isMute = this.state.isMute;

    this.setState({
      isMute: !isMute
    });
  }

  handleEdit(event) {
    event.preventDefault();
    this.setState({
      showPopover: true,
      anchorEl: event.currentTarget
    });
  }

  closePopover() {
    this.setState({ showPopover: false });
  }

  selectSequence(_event, _key, soundName) {
    let tone;

    if (soundName === 'membrane') {
      tone = 'Bb4';
    } else {
      tone = 200;
    }

    const sound = { tone, def: beatSounds[soundName] };

    this.setState({
      sound,
      sequence: toneSequence(sound, this.state.events, this.state.subdivision)
    });
  }

  render() {
    return (
      <div className="sequence">
        <div className="controls">
          <RemoveSequenceButton
            handleClick={this.props.handleClick}
          />
          <MuteButton
            isMute={this.state.isMute}
            handleClick={this.toggleMute}
          />
          <EditSequence
            anchorEl={this.state.anchorEl}
            showPopover={this.state.showPopover}
            handleOpen={this.handleEdit}
            handleClose={this.closePopover}
            handleSelect={this.selectSequence}
          />
        </div>
        <Row events={this.state.events} handleClick={this.toggleBeat} />
      </div>
    );
  }
}

Sequence.propTypes = {
  isPlaying: React.PropTypes.bool.isRequired
};

export default Sequence;
