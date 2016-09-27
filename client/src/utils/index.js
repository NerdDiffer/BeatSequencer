// Path to sound file is relative to static dir you set up on server-side
const pathToSoundFile = soundDef => `/dist/sounds/TR808/${soundDef}`;

// Create a deep splice of a 2D array

const deepCopy = (subArr, j) => {
  const newValue = subArr[j] === 0 ? 1 : 0;

  return [
    ...subArr.slice(0, j),
    newValue,
    ...subArr.slice(j + 1)
  ];
};

const deepSplice = (events, i) => {
  const newValue = events[i] === 0 ? 1 : 0;

  return [
    ...events.slice(0, i),
    newValue,
    ...events.slice(i + 1)
  ];
};

// flatten a 2D array into a 1D array
const flatten = arr => {
  let result = [];
  let i = 0;

  while (i < arr.length) {
    result = result.concat(arr[i]);
    i += 1;
  }

  return result;
};

// return copy of matrix so that row & column values are switched.
// props to: `http://stackoverflow.com/a/17428705/2908123`
const transpose = matrix => {
  return matrix[0].map((col, ind) => {
    return matrix.map((row) => {
      return row[ind];
    });
  });
};

export {
  deepSplice,
  pathToSoundFile,
  flatten,
  transpose
};
