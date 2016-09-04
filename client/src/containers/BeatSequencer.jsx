import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BeatSequencerActions from '../actions';
import BeatSequencer from '../components/BeatSequencer';

const mapStateToProps = state => {
  return {
    sequences: state.sequences,
    isPlaying: state.playing,
    bpm: state.bpm,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(BeatSequencerActions, dispatch)
  }
}

const BeatSequencerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BeatSequencer)

export default BeatSequencerContainer
