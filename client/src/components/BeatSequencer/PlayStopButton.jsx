import React from 'react';
import IconButton from 'material-ui/IconButton';

const PlayStopButton = ({ isPlaying, handleClick }) => (
  <div className="playStopButton" onClick={handleClick}>
    <IconButton
      iconClassName="material-icons"
    >
      { isPlaying ? "stop" : "play_arrow" }
    </IconButton>
  </div>
);

PlayStopButton.propTypes = {
  isPlaying: React.PropTypes.bool.isRequired,
  handleClick: React.PropTypes.func.isRequired
};

export default PlayStopButton;
