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

const deepSplice = (events, i, j) => {
  const subArr = events[i];
  const newValue = deepCopy(subArr, j);

  return [
    ...events.slice(0, i),
    newValue,
    ...events.slice(i + 1)
  ];
};

export {
  deepSplice,
  pathToSoundFile
};
