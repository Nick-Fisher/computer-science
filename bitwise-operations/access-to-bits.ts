// A function that gets a Uint8Array and provides the ability to access a bit of a certain element

interface IBitGetter {
  get: (position: number, index: number) => number;
}

const createBitGetter = (array: Uint8Array): IBitGetter => {
  const get = (element: number, index: number) => {
    return (array[element] & (1 << index)) !== 0 ? 1 : 0;
  };

  return {
    get,
  };
};

const bitGetter = createBitGetter(new Uint8Array([0b1110, 0b1101]));

// Second parameter is order of bit from right to left
console.log(bitGetter.get(0, 2)); // 1
console.log(bitGetter.get(1, 2)); // 0
// ```

// ## expand functionality of function and give an abillity to set a value of exact bit

// ```js
// const bitAccessor = createBitAccessor(new Uint8Array([0b1110, 0b1101]));

// console.log(bitAccessor.set(0, 1, 0)); //
// console.log(bitAccessor.get(0, 1));    // 0
