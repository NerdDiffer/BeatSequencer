import React from 'react';
import IconButton from 'material-ui/IconButton';

const MuteButton = ({ isMute, handleClick }) => (
  <div className="muteButton" onClick={handleClick}>
    <IconButton
      iconClassName="material-icons"
    >
      { isMute ? "volume_off" : "volume_up" }
    </IconButton>
  </div>
);

MuteButton.propTypes = {
  isMute: React.PropTypes.bool.isRequired,
  handleClick: React.PropTypes.func.isRequired
};

export default MuteButton;
