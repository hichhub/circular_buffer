import CircularBuffer from '../src/modules/circularbuffer';

describe('CircularBuffer', () => {
  let CB = new CircularBuffer(100);
  let dummykv = {
    key: 'testName',
    value: 'testValue'
  };
  let wrongDummykv = {
    key: 'wrongTestName',
    value: 'wrongTestValue'
  };

  beforeEach(() => {
    CB.set(dummykv.key, dummykv.value);
  })

  test('expect to set new key-value', async () => {
    expect(await CB.get(dummykv.key)).toBe(dummykv.value)
  });

  test('expect to get key\'s value', async () => {
    expect(await CB.get(dummykv.key)).toBe(dummykv.value);
  });

  test('expect to be undefined error when key doesn\'t exist', async () => {
    expect(await CB.get(wrongDummykv.key)).toBe(undefined);
  });

  test('expect to delete key', async () => {
    CB.del(dummykv.key);
    expect(await CB.get(wrongDummykv.key)).toBe(undefined);
  });

  test('expect to circular buffer be flushed', () => {
    CB.flush()
    expect(CB.mapBuffer.size).toBe(0)
  })
});
