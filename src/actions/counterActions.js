export function incCounter() {
  console.log('increment counter!');
  return {
    type: 'INCREMENT',
  };
}

export function decCounter() {
  return {
    type: 'DECREMENT',
  };
}

// export default incCounter;
