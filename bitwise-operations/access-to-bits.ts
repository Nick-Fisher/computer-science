// A function that gets a Uint8Array and provides the ability to access a bit of a certain element

interface IBitGetter {
  get: (elementIndex: number, bitIndex: number) => number;
  set: (elementIndex: number, bitIndex: number, value: number) => number;
}

const createBitGetter = (array: Uint8Array): IBitGetter => {
  const validate = (elementIndex: number, bitIndex: number) => {
    if (bitIndex < 0) {
      throw new Error('Bit index must be positive');
    }

    if (elementIndex < 0) {
      throw new Error('Element index must be greater than 0');
    }

    if (elementIndex > array.length) {
      throw new Error('There is no element at index ' + elementIndex);
    }

    if (array.BYTES_PER_ELEMENT * 8 < bitIndex) {
      throw new Error(
        'Bit index cannot be greater than amount of bits in array element'
      );
    }
  };

  const get = (elementIndex: number, bitIndex: number) => {
    validate(elementIndex, bitIndex);
    return (array[elementIndex] & (1 << bitIndex)) !== 0 ? 1 : 0;
  };

  const set = (elementIndex: number, bitIndex: number, value: number) => {
    validate(elementIndex, bitIndex);
    return value === 0
      ? array[elementIndex] & ~(1 << bitIndex)
      : array[elementIndex] | (1 << bitIndex);
  };

  return {
    get,
    set,
  };
};

const bitGetter = createBitGetter(new Uint8Array([0b1110, 0b1101]));

// Second parameter is order of bit from right to left
console.log(bitGetter.get(0, 2)); // 1
console.log(bitGetter.get(1, 2)); // 0
// ```

// ## expand functionality of function and give an ability to set a value of exact bit

// ```js
// const bitAccessor = createBitAccessor(new Uint8Array([0b1110, 0b1101]));

// console.log(bitAccessor.set(0, 1, 0)); //
// console.log(bitAccessor.get(0, 1));    // 0
