// seed data

// use these for testing
const beat1 = [[1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
const beat2 = [[0, 0, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
const beat3 = [[0, 0, 0, 0], [0, 0, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0]];
const beat4 = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [1, 0, 0, 0]];

const defaultTones = {
  // from beatDefs
  bell: 200,
  conga: 200,
  membrane: 'Bb4',
  metal: 200
  // from TR808: they are all 0
};

const defaultSequences = [
  {
    id: 0,
    tone: '200',
    // soundDef: 'bell',
    soundDef: 'Cowbell',
    events: [[1, 0, 0, 0], [1, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
    subdivision: '4n',
    mute: false
  },
  {
    id: 1,
    tone: '300',
    // soundDef: 'conga',
    soundDef: 'Clap',
    events: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [1, 0, 1, 1]],
    subdivision: '4n',
    mute: false
  },
  {
    id: 2,
    tone: 'Bb4',
    // soundDef: 'membrane',
    soundDef: 'BassDrum',
    events: [[1, 0, 0, 1], [1, 0, 0, 0], [1, 0, 0, 1], [1, 0, 0, 0]],
    subdivision: '4n',
    mute: false
  },
  {
    id: 3,
    tone: '200',
    // soundDef: 'metal',
    soundDef: 'SnareDrum',
    events: [[0, 0, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0], [1, 0, 0, 0]],
    subdivision: '4n',
    mute: false
  }
];

export {
  defaultTones,
  defaultSequences
}
