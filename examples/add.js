function addNumbers(a, b) {
  return a + b;
}

console.log(
  'their results:',
  addNumbers(...[1, 2])
);
