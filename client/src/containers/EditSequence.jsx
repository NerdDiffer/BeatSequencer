import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EditSequence from '../components/BeatSequencer/EditSequence';

const mapStateToProps = state => {
  return {
    soundSets: state.soundSets
  };
};

const EditSequenceContainer = connect(
  mapStateToProps
)(EditSequence)

export default EditSequenceContainer
