import { logger } from '../src/logger';
import MemkvStore from '../src/modules/memkvstore';
import PersistableCircularBuffer from '../src/modules/persistable_circularbuffer';

const BUFFER_SIZE = 10;
const dummyObj = {
  key: 'testName',
  value: 'testValue',
};
const wrongDummykv = {
  key: 'wrongTestName',
  value: 'wrongTestValue',
};
const dummyMapBuffer = new Map([['key1', 'value1'], ['key2', 'value2']]);
const dummyArrayBuffer = ['key1', 'key2'];

describe('PersistableCircularBuffer', () => {
  const store = new MemkvStore();
  const PCB = new PersistableCircularBuffer(BUFFER_SIZE, store, 'testStore');

  beforeEach(() => {
    PCB.set(dummyObj.key, dummyObj.value);
  });

  test('expect to set and get new key-value', async () => {
    expect(await PCB.get(dummyObj.key)).toBe(dummyObj.value);
  });

  test('expect to load new store', async () => {
    const store2 = new MemkvStore();
    const store2Name = 'store2';

    await store2.set(`${store2Name}_arraybuffer`, JSON.stringify(dummyArrayBuffer));
    await store2.set(`${store2Name}_mapbuffer`, JSON.stringify([...dummyMapBuffer]));
    await PCB.load(store2, store2Name);

    expect(await PCB.get('key1')).toBe(await dummyMapBuffer.get('key1'));
  });
});
