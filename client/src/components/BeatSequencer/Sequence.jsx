import React, { Component } from 'react';
import Row from './Row';
import MuteButton from './MuteButton';
import EditSequence from './EditSequence';
import RemoveSequenceButton from './RemoveSequenceButton';
import ToneSequence from '../../sounds/ToneSequence';

/**
 * - toggles active sounds on a subdivision
 *   (generates a pattern based on user interaction)
 * - groups a beat (start with an easy default)
 * - renders a dumb row
 */
class Sequence extends Component {
  constructor(props) {
    super(props);

    // continue store UI state in this component
    this.state = {
      isMute: false, // TODO: decide if this should be part of global state
      showPopover: false,
      anchorEl: null
    };

    this.toggleBeat = this.toggleBeat.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.closePopover = this.closePopover.bind(this);
    this.editSoundDef = this.editSoundDef.bind(this);
    this._setToneSequence = this._setToneSequence.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this._setToneSequence();
    const willBePlaying = nextProps.isPlaying;

    if (willBePlaying) {
      this._toneSequence.start();
    } else {
      this._toneSequence.stop();
    }
  }

  toggleBeat(index) {
    const { actions, id, tone, soundDef, events, subdivision } = this.props;
    const newValue = events[index] === 0 ? 1 : 0;
    const newEvents = [
      ...events.slice(0, index),
      newValue,
      ...events.slice(index + 1)
    ];
    const updatedSequence = {
      id,
      tone,
      soundDef,
      events: newEvents,
      subdivision
    };

    actions.updateSequence(updatedSequence);

    this._setToneSequence();
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

  _setToneSequence() {
    const { tone, soundDef, events, subdivision } = this.props;
    const sound = {
      tone,
      soundDef,
      events,
      subdivision
    };

    this._toneSequence = new ToneSequence(sound);
  }

  editSoundDef(_event, _key, soundDef) {
    const { actions, id, events, subdivision } = this.props;

    let tone;

    if (soundDef === 'membrane') {
      tone = 'Bb4';
    } else {
      tone = 200;
    }

    const updatedSequence = {
      id,
      tone,
      soundDef,
      events,
      subdivision
    };

    actions.updateSequence(updatedSequence);
    this._setToneSequence();
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
            handleSelect={this.editSoundDef}
          />
        </div>
        <Row events={this.props.events} handleClick={this.toggleBeat} />
      </div>
    );
  }
}

Sequence.propTypes = {
  isPlaying: React.PropTypes.bool.isRequired
};

export default Sequence;
