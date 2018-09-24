import { logger } from '../src/logger';
import CircularBuffer from '../src/modules/circularbuffer';

const BUFFER_SIZE = 10;
const dummyObj = {
  key: 'testName',
  value: 'testValue',
};
const wrongDummykv = {
  key: 'wrongTestName',
  value: 'wrongTestValue',
};

describe('CircularBuffer', () => {
  const CB = new CircularBuffer(BUFFER_SIZE);

  beforeEach(() => {
    CB.set(dummyObj.key, dummyObj.value);
  });

  test('expect to set new key-value', async () => {
    expect(await CB.get(dummyObj.key)).toBe(dummyObj.value);
  });

  test('expect to get key\'s value', async () => {
    expect(await CB.get(dummyObj.key)).toBe(dummyObj.value);
  });

  test('expect to be undefined error when key doesn\'t exist', async () => {
    expect(await CB.get(wrongDummykv.key)).toBe(undefined);
  });

  test('expect to delete key', async () => {
    CB.del(dummyObj.key);
    expect(await CB.get(wrongDummykv.key)).toBe(undefined);
  });

  test('expect to circular buffer be flushed', () => {
    CB.flush();
    expect(CB.mapBuffer.size).toStrictEqual(0);
  });

  test('expect to get arraies of of values', async () => {
    expect(await CB.toArray()).toBeInstanceOf(Array);
  });

  test('expect to get arraies of of filtered values', async () => {
    const expectedArray = ['AA', 'AAA'];
    CB.flush();
    CB.set('test1', 'A');
    CB.set('test2', 'AA');
    CB.set('test3', 'AAA');

    expect(await CB.toArray((item: string) => item.length > 1))
    .toStrictEqual(expectedArray);
  });

  test('expect to pointer be 0 when buffer filled', () => {
    CB.flush();

    for (let index = 0; index < BUFFER_SIZE + 1; index++) {
      CB.set(`${dummyObj.key}_${index}`, `${dummyObj.value}_${index}`);
    }

    expect(CB.pointer).toEqual(0);
    CB.flush();
  });
});
