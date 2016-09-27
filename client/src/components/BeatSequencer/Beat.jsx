import React from 'react';
import classnames from 'classnames';

const Beat = ({ event, handleClick, beatIndex }) => {
  const determineWidth = () => {
    let width;
    if (Array.isArray(event) && event.length > 1) {
      // If used in combination with the style of `box-sizing: border-box`
      // then, this can *barely* fit into the space without overflowing.
      // Note, the `box-sizing` CSS setting mentioned above will *not* take
      // the width of the border into account. That's why there is a minus 1.
      width = Math.floor(100 / event.length) - 1;
      return { width: width + '%' }
    } else {
      width = Math.floor(100 / 16);
      return { width: width + '%' };
    }
  };

  const renderBeat = (beat, index) => {
    const beatStyle = classnames({ selected: beat === 1 }, 'beatBox');
    const handleClickForIndex = handleClick.bind(null, beatIndex, index);

    return (
      <div
        className={beatStyle}
        key={index}
        onClick={handleClickForIndex}
      />
    );
  };

  const arrOfBeats = beats => {
    return beats.map(renderBeat);
  };

  return (
    <div className='beat' style={determineWidth()}>
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
