import React from 'react';
import IconButton from 'material-ui/IconButton';

const AddSequenceButton = ({ handleClick }) => (
  <div className="addSequence" onClick={handleClick}>
    <IconButton iconClassName="material-icons">add_circle_outline</IconButton>
  </div>
);

AddSequenceButton.propTypes = {
  handleClick: React.PropTypes.func.isRequired
};

export default AddSequenceButton;
