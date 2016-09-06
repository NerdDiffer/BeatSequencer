import expect from 'expect'
import { deepSplice } from '../../client/src/utils';

describe('utils', () => {
  describe('deepSplice', () => {
    const testArr = [[1, 1, 0, 0], [1, 1, 0, 0], [1, 1, 0, 0], [1, 1, 0, 0]];

    it('returns this result', () => {
      var actual = deepSplice(testArr, 1, 3);
      var expected = [[1, 1, 0, 0], [1, 1, 0, 1], [1, 1, 0, 0], [1, 1, 0, 0]];

      expect(actual).toEqual(expected)
    });
  });
});
