# Many Worlds JavaScript Interpreter

### Table of Contents

- [Introduction](#introduction)
- [What Kind of Transformations Will It Apply?](#what-kind-of-transformations-will-it-apply)
- [How Does It Work?](#how-does-it-work)

## Introduction

This is a fun thought experiment that is inspired by [Sean Carroll's YouTube talk](https://www.youtube.com/watch?v=gpEvv349Pyk)
on the [many-worlds interpretation of quantum mechanics](https://en.wikipedia.org/wiki/Many-worlds_interpretation).

My understanding is that the many-worlds interpretation of quantum mechanics
imagines our universe as one node of an infinitely branching tree of universes.
And each time a universe branches, it produces a child universe which is
slightly different from the parent universe.

Now imagine that you're in an interview and you're asked to code FizzBuzz. In
this universe you decide that you want to use a for-loop. According to the
many-worlds interpretation, your universe branched into many universes the
moment you decided to use a for-loop. In this universe you used a for-loop but
in another universe you used a while-loop.

What if you could explore these branches?

This program allows you to do that by applying non-destructive transformations
to your code that could plausibly be attributed to good or bad human decision
making in multiple universes. With this program you can see what mistakes or
improvements other versions of you might have made in other universes. It's also
worth nothing that these transformations might not actually be mistakes because
in other universes the constants are not always going to be the same as ours.

## What Kind of Transformations Will It Apply?

I can neither confirm nor deny that this program will apply any of the following
transformations to your code.

  - Shuffle arrays.
  - Swap binary expression operands.
  - Swap bitwise, equality logical and math operators.
  - Shuffle function call arguments.
  - Create numeric off-by-one errors.
  - Decrement instead of increment.
  - Transform for-loops into while-loops.

## How Does It Work?

This program is essentially just a [Babel](https://babeljs.io) plugin. Babel
does all of the heavy lifting. All I did was create a visitor that randomly
applies the transformations that I described above.

I chose to represent the many-worlds as a binary tree. Each time a universe
branches it creates 2 child universes. You can control the depth of recursion
with the `--depth` flag.

```shell
$ bin/run examples/fizzbuzz.js --depth 1
```

```javascript
Tree {
  depth: 0,
  data: {
    id: 'World 0',
    code: 'for (let i = 1; i <= 100; i++) {\n' +
      '  if (i % 15 === 0) {\n' +
      "    console.log('FizzBuzz');\n" +
      '  } else if (i % 5 === 0) {\n' +
      "    console.log('Buzz');\n" +
      '  } else if (i % 3 === 0) {\n' +
      "    console.log('Fizz');\n" +
      '  } else {\n' +
      '    console.log(i);\n' +
      '  }\n' +
      '}'
  },
  children: [
    Tree {
      depth: 1,
      data: {
        id: 'World 0 => World 0₀',
        code: 'let i = 1;\n' +
          '\n' +
          'while (100 <= i) {\n' +
          '  if (i % 15 === 0) {\n' +
          "    console.log('FizzBuzz');\n" +
          '  } else if (6 + i === 1) {\n' +
          "    console.log('Buzz');\n" +
          '  } else if (1 === i % 3) {\n' +
          "    console.log('Fizz');\n" +
          '  } else {\n' +
          '    console.log(i);\n' +
          '  }\n' +
          '\n' +
          '  i++\n' +
          '}'
      }
    },
    Tree {
      depth: 1,
      data: {
        id: 'World 0 => World 0₁',
        code: 'for (let i = 1; 99 <= i; i++) {\n' +
          '  if (i % 16 === 0) {\n' +
          "    console.log('FizzBuzz');\n" +
          '  } else if (i % 5 === 0) {\n' +
          "    console.log('Buzz');\n" +
          '  } else if (2 % i === 0) {\n' +
          "    console.log('Fizz');\n" +
          '  } else {\n' +
          '    console.log(i);\n' +
          '  }\n' +
          '}'
      }
    }
  ]
}
```
