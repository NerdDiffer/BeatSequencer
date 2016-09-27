import React, { Component } from 'react';
import Row from './Row';
import MuteButton from './MuteButton';
import EditSequence from '../../containers/EditSequence';
import RemoveSequenceButton from './RemoveSequenceButton';
import { deepSplice } from '../../utils';

const mergeSequence = (template, newStuff) => {
  return Object.assign(template, newStuff);
};

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
  }

  toggleBeat(index) {
    const { actions, id, soundDef, events, subdivision, mute } = this.props;
    const newEvents = deepSplice(events, index);
    const updatedSequence = mergeSequence({
      id, soundDef, subdivision, mute
    }, { events: newEvents });
    actions.updateSequence(updatedSequence);
    this.props.toggleBeat(index, id);
  }

  toggleMute() {
    const { actions, id, soundDef, events, subdivision, mute } = this.props;
    const updatedSequence = mergeSequence({
      id, soundDef, events, subdivision
    }, { mute: !mute});

    actions.updateSequence(updatedSequence);
    this.props.toggleMute(id);
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

  editSoundDef(_event, _key, soundDef) {
    const { actions, id, events, subdivision, mute } = this.props;

    const updatedSequence = mergeSequence({
      id, events, subdivision, mute
    }, { soundDef });

    actions.updateSequence(updatedSequence);
    this.props.editSoundDef(soundDef, id);
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
            soundDef={this.props.soundDef}
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
