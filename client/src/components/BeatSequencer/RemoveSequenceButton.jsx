import React from 'react';
import IconButton from 'material-ui/IconButton';

const RemoveSequenceButton = ({ handleClick }) => (
  <div className="removeSequence" onClick={handleClick}>
    <IconButton iconClassName="material-icons">remove_circle_outline</IconButton>
  </div>
);

RemoveSequenceButton.propTypes = {
  handleClick: React.PropTypes.func.isRequired
};

export default RemoveSequenceButton;
