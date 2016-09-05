import React from 'react';
import classnames from 'classnames';

const Beat = ({ event, handleClick }) => {
  const determineWidth = () => {
    if (Array.isArray(event) && event.length > 1) {
      // If used in combination with the style of `box-sizing: border-box`
      // then, this can *barely* fit into the space without overflowing.
      // Note, the `box-sizing` CSS setting mentioned above will *not* take
      // the width of the border into account. That's why there is a minus 1.
      const width = Math.floor(100 / event.length) - 1;
      return { width: width + '%' }
    } else {
      return { width: '100%' };
    }
  };

  const renderBeat = (beat, index) => {
    const beatStyle = classnames({ selected: beat === 1 }, 'beatBox');
    const handleClickForIndex = handleClick.bind(null, index);

    return (
      <div
        className={beatStyle}
        key={index}
        onClick={handleClickForIndex}
        style={determineWidth()}
      />
    );
  };

  const arrOfBeats = beats => {
    return beats.map(renderBeat);
  };

  return (
    <div className='beat'>
      {Array.isArray(event) ? arrOfBeats(event) : renderBeat(event)}
    </div>
  );
};

Beat.propTypes = {
  event: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.number
  ]).isRequired,
  handleClick: React.PropTypes.func.isRequired
};

export default Beat;
