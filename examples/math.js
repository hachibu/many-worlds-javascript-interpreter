function calculateSomething(a, b) {
  return (a + b - (b * b)) / (a / 5.5);
}

console.log('Here are the results:', calculateSomething(...[1, 2]));
