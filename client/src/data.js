// seed data
import sounds from './sounds';
import { flatten, generateId } from './utils';

// use these for testing
const beat1 = [[1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
const beat2 = [[0, 0, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
const beat3 = [[0, 0, 0, 0], [0, 0, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0]];
const beat4 = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [1, 0, 0, 0]];

const defaultNewSequence = {
  tone: 0,
  soundDef: 'Maracas',
  events: flatten([[1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0]]),
  subdivision: '4n',
  mute: false
};

const defaultSequences = [
  {
    tone: 0,
    soundDef: 'Cowbell',
    id: generateId(),
    events: flatten([[1, 0, 0, 0], [1, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0]]),
    subdivision: '4n',
    mute: false
  },
  {
    tone: 0,
    soundDef: 'Clap',
    id: generateId(),
    events: flatten([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [1, 0, 1, 1]]),
    subdivision: '4n',
    mute: false
  },
  {
    tone: 0,
    soundDef: 'SnareDrum',
    id: generateId(),
    events: flatten([[0, 0, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0], [1, 0, 0, 0]]),
    subdivision: '4n',
    mute: false
  },
  {
    tone: 0,
    soundDef: 'BassDrum',
    id: generateId(),
    events: flatten([[0, 0, 1, 0], [1, 1, 0, 0], [1, 0, 0, 1], [1, 0, 0, 0]]),
    subdivision: '4n',
    mute: false
  }
];

const defaultSoundKeys = (() => {
  const registry = {};

  for (let set in sounds) {
    registry[set] = [];

    for (let sound in sounds[set]) {
      registry[set].push(sound);
    }
  }

  return registry;
})();

export {
  defaultSequences,
  defaultSoundKeys,
  defaultNewSequence
}
