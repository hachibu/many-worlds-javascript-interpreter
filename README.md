# Many Worlds JavaScript Interpreter

Explore the [many-worlds interpretation of quantum mechanics](https://en.wikipedia.org/wiki/Many-worlds_interpretation)
and see programming mistakes you might have made in another universe.

__What kind mistakes will it make?__

My guiding principle, when deciding what types of transformation to apply, was
to make it so programs would still run. With that in mind, I tried to avoid
creating syntax errors, making destructive transformations like deleting
characters from strings or changing identifiers.

Here is a list of transformations this program may or may not do to your code:

- Shuffle arrays.
- Swap binary expression operands.
- Swap binary operators.
- Shuffle function call arguments.
- Create off-by-one errors.
- Create typos in strings.

__How does it work?__

I created a Babel plugin to apply the transformations. Babel does all the heavy
lifting. All I did was create a visitor and define my transformations.

For the many-worlds I chose to represent it as a binary tree. The root universe
is created automatically and each time a universe branches it creates 2 new
universes. You can control the depth of recursion with the `--depth` flag.

If I ran the command `bin/run examples/math.js --depth 1` the output would be:

```js
/* World 0 */
function calculate(a, b, c) {
  return a + b * c;
}

console.log('The result is', calculate(...[0, 1, 2]));

/* World 0 => World 0₀ */
function calculate(a, b, c) {
  return a + b * c;
}

console.log(calculate(...[1, 1, 2]), "Tha rasolt os");

/* World 0 => World 0₁ */
function calculate(a, b, c) {
  return a + b * c;
}

console.log(calculate(...[0, 0, 3]), 'The result is');
```

You should notice that each universe has a comment showing its path in the
binary tree of universes. A subscript of 0 means it's the left branch and a
subscript of 1 means it's the right branch.

In the example output above, `World 0 => World 0₀` is the left branch of
`World 0` and `World 0 => World 0₁` is the right branch of `World 0`.

## Setup

    yarn install

## Usage

    bin/run examples/math.js --depth 1
    bin/run examples/math.js --depth 1 | node

## Install Script

    yarn link

## Uninstall Script

    yarn unlink
