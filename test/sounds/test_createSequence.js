// Having trouble getting tests to work with 'import' keyword.
// TODO: configure karma + webpack to allow it.

const expect = require('expect');
const Tone = require('tone');
const createSequence = require('../../client/src/sounds/ToneJS/createSequence').default;

describe('Tone.createSequence', () => {
  const parentObj = {
    beatMatrix: [],
    samplers: []
  };

  let instance;

  beforeEach(() => {
    instance = createSequence(parentObj);
  });

  it('creates an instance of Sequence', () => {
    expect(instance.constructor).toBe(Tone.Sequence);
  });

  it('has these properties & values', () => {
    expect(instance.loopStart).toBe('0');
    expect(instance.loopEnd).toBe('1m');
    expect(instance.subdivision).toBe('16n');
  })
});
