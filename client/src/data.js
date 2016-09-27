// seed data
import sounds from './sounds';
import { flatten } from './utils';

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
    id: 0,
    tone: 0,
    soundDef: 'Cowbell',
    events: flatten([[1, 0, 0, 0], [1, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0]]),
    subdivision: '4n',
    mute: false
  },
  {
    id: 1,
    tone: 0,
    soundDef: 'Clap',
    events: flatten([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [1, 0, 1, 1]]),
    subdivision: '4n',
    mute: false
  },
  {
    id: 2,
    tone: 0,
    soundDef: 'SnareDrum',
    events: flatten([[0, 0, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0], [1, 0, 0, 0]]),
    subdivision: '4n',
    mute: false
  },
  {
    id: 3,
    tone: 0,
    soundDef: 'BassDrum',
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
