import { v4 as generateUuid } from 'uuid';

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

/**
 * Generate array of objects.
 * @param matrix, {Object} An object whose keys are sequence ids and values
 *   are the events array from associated sequence
 */
const transpose = matrix => {
  const keys = Object.keys(matrix);
  if (keys.length === 0) { return; }

  const result = [];
  const firstRowLen = matrix[keys[0]].length;

  // across the 'columns'...
  for (let colInd = 0; colInd < firstRowLen; colInd += 1) {
    // across 'rows'...
    for (let rowInd = 0; rowInd < keys.length; rowInd += 1) {
      const rowName = keys[rowInd];
      const row = matrix[rowName];
      const val = row[colInd];

      if (result[colInd] === undefined) {
        result[colInd] = {};
      }

      result[colInd][rowName] = val;
    }
  }

  return result;
};

// Return an array of numbers from 0 to `len`. Excludes `len`.
const generateRange = len => {
  const range = [];
  let i = 0;

  while (i < len) {
    range.push(i);
    i += 1;
  }

  return range;
};

// iterate over an object's enumerable properties & run a callback on each
// pass in `true` for `safe` parameter to enable type checking
const forEachInObj = (obj, fn, safe = false) => {
  if (!safe) {
    for (let key in obj) {
      fn(obj[key], key, obj);
    }
  } else {
    const isObject = obj !== null && !Array.isArray(obj) && typeof obj === 'object';

    if (!isObject) {
      throw new TypeError('Pass in an object. Cannot be an array or null');
    } else {
      for (let key in obj) {
        fn(obj[key], key, obj);
      }
    }
  }
};

const generateId = () => {
  let uuid = generateUuid();
  uuid = uuid.slice(0, uuid.indexOf('-'));
  return `${uuid}`;
};

export {
  deepSplice,
  pathToSoundFile,
  flatten,
  transpose,
  generateRange,
  forEachInObj,
  generateId
};
