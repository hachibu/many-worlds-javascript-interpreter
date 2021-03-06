# Many Worlds JavaScript Interpreter

### Table of Contents

- [Introduction](#introduction)
- [Usage](#usage)

## Introduction

This is a command line tool that allows you to explore your code in alternate
universes.

It's essentially a [Babel](https://babeljs.io) compiler plugin that randomly
applies minor transformations to your code that could be attributed to human
decision making therefore simulating what you might have written in another
universe.

Here's a complete list of all the transformations that might be applied to your
code in order to simulate outcomes in other universes.

  - Transform for-loops into while-loops.
  - Shuffle arrays and function call arguments.
  - Swap binary expression operands.
  - Swap bitwise, equality logical and math operators.
  - Create numeric off-by-one errors.
  - Decrementing instead of incrementing inside of update expressions.

This project was inspired by [Sean Carroll's talk on the many-worlds interpretation of quantum mechanics](https://www.youtube.com/watch?v=gpEvv349Pyk).

## Usage

```shell
$ bin/run examples/fizzbuzz.js --recursion-depth 1
```

```javascript
Universe {
  data: {
    name: 'World 0',
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
    Universe {
      data: {
        name: 'World 0 => World 0₀',
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
    Universe {
      data: {
        name: 'World 0 => World 0₁',
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
