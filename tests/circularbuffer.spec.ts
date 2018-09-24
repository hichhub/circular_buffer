import CircularBuffer from '../src/modules/circularbuffer';

describe('CircularBuffer', () => {
  let CB = new CircularBuffer(100)
  let dummykv = {
    key: 'testName',
    value: 'testValue'
  }

  test('expect to set new key-value', async () => {
    CB.set(dummykv.key, dummykv.value)
    expect(await CB.get(dummykv.key)).toBe(dummykv.value)
  });
});
