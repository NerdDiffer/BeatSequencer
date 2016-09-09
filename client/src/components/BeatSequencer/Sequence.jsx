import React, { Component } from 'react';
import Row from './Row';
import MuteButton from './MuteButton';
import EditSequence from '../../containers/EditSequence';
import RemoveSequenceButton from './RemoveSequenceButton';
import ToneSequence from '../../sounds/ToneJS/ToneSequence';
import { deepSplice } from '../../utils';

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

  toggleBeat(beatIndex, index) {
    const { actions, id, soundDef, events, subdivision, mute } = this.props;
    const newEvents = deepSplice(events, beatIndex, index);
    const updatedSequence = {
      id,
      soundDef,
      events: newEvents,
      subdivision,
      mute
    };

    actions.updateSequence(updatedSequence);

    this._setToneSequence();
  }

  toggleMute() {
    const { actions, id, soundDef, events, subdivision, mute } = this.props;

    const updatedSequence = {
      id,
      soundDef,
      events,
      subdivision,
      mute: !mute
    };

    actions.updateSequence(updatedSequence);
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
    const { soundDef, events, subdivision, mute } = this.props;
    const sound = {
      soundDef,
      events,
      subdivision,
      mute
    };

    if (this._toneSequence) {
      this._toneSequence.dispose();
    }

    this._toneSequence = new ToneSequence(sound);
  }

  editSoundDef(soundDef) {
    const { actions, id, events, subdivision, mute } = this.props;

    const updatedSequence = {
      id,
      soundDef,
      events,
      subdivision,
      mute
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
            isMute={this.props.mute}
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
