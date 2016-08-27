import React from 'react';
import classnames from 'classnames';

/**
 * - receives props from parent `Sequence`
 * - renders each subdivision of the beat
 */
const Row = ({ events, handleClick }) => {
  const renderBeat = (beat, index) => {
    const beatStyle = classnames({ selected: beat === 1 }, 'beatBox');
    const handleClickForIndex = handleClick.bind(null, index);

    return <div className={beatStyle} key={index} onClick={handleClickForIndex} />;
  };

  return (
    <div className="row">
      { events.map((beat, index) => renderBeat(beat, index)) }
    </div>
  );
};

Row.propTypes = {
  events: React.PropTypes.array.isRequired,
  handleClick: React.PropTypes.func.isRequired,
};

export default Row;
