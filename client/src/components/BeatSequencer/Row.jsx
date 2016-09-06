import React from 'react';
import classnames from 'classnames';
import Beat from './Beat';

const Row = ({ events, handleClick }) => {
  const renderBeat = (event, index) => {
    return (
      <Beat
        event={event}
        key={index}
        handleClick={handleClick}
        beatIndex={index}
      />
    );
  };

  const renderBeats = events => {
    return events.map(renderBeat);
  };

  return (
    <div className="row">
      {renderBeats(events)}
    </div>
  );
};

Row.propTypes = {
  events: React.PropTypes.array.isRequired,
  handleClick: React.PropTypes.func.isRequired
};

export default Row;
