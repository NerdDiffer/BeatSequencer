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

    const tone = 'Bb4';
    const soundDef = 'membrane';
    const events = [1, 0, 0, 1];
    const subdivision = '4n';
    //const sound = { tone, soundDef, events, subdivision };

    this.state = {
      tone,
      soundDef,
      events, // events for ToneSequence object
      subdivision,
      isMute: false,
      showPopover: false
    };

    this.toggleBeat = this.toggleBeat.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.closePopover = this.closePopover.bind(this);
    this.selectSequence = this.selectSequence.bind(this);
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
    const events = this.state.events;
    const newValue = events[index] === 0 ? 1 : 0;
    const newEvents = [
      ...events.slice(0, index),
      newValue,
      ...events.slice(index + 1)
    ];

    this.setState({
      events: newEvents,
    });

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
    const sound = {
      tone: this.state.tone,
      soundDef: this.state.soundDef,
      events: this.state.events,
      subdivision: this.state.subdivision
    };

    this._toneSequence = new ToneSequence(sound);
  }

  selectSequence(_event, _key, soundDef) {
    let tone;

    if (soundDef === 'membrane') {
      tone = 'Bb4';
    } else {
      tone = 200;
    }

    this.setState({
      tone,
      soundDef
    });

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
