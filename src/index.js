var _ = require('lodash');

function choose() {
  var n = 0;
  var m = _.random(10);

  return _.random(n, m) === n;
}

function randomVisitor(...fs) {
  return function(...args) {
    for (var f of fs) {
      if (choose()) {
        f(...args);
      }
    }
  };
}

module.exports = function({ types: t }) {
  var visitor = {
    ArrayExpression: randomVisitor(
      (path) => {
        path.node.elements = _.shuffle(path.node.elements);
      }
    ),
    BinaryExpression: randomVisitor(
      (path) => {
        var left = path.node.left;

        path.node.left = path.node.right;
        path.node.right = left;
      },
      (path) => {
        var oldOperator = path.node.operator;
        var newOperator = oldOperator;
        var operators = {
          bitwise: ['|', '^', '&', '<<', '>>', '>>>'],
          equality: ['==', '!=', '===', '!==', '<', '<=', '>', '>='],
          math: ['+', '-', '*', '/', '%', '**'],
        };

        _.each(operators, (choices, _type) => {
          if (_.includes(choices, oldOperator)) {
            newOperator = _.sample(choices);
            return false;
          }
        });

        path.replaceWith(
          t.binaryExpression(newOperator, path.node.left, path.node.right)
        );
      }
    ),
    CallExpression: randomVisitor(
      (path) => {
        path.node.arguments = _.shuffle(path.node.arguments);
      }
    ),
    Identifier: randomVisitor(
      (path) => {
        var format = _.sample([
          _.upperFirst,
          _.lowerFirst,
          _.camelCase,
          _.snakeCase
        ]);
        path.node.name = format(path.node.name);
      }
    ),
    NumericLiteral: randomVisitor(
      (path) => {
        if (path.node.value >= 0) {
          path.node.value += 1;
        }
      },
      (path) => {
        if (path.node.value > 0) {
          path.node.value -= 1;
        }
      },
    ),
    StringLiteral: randomVisitor(
      (path) => {
        var format = _.sample([
          _.upperFirst,
          _.lowerFirst,
        ]);

        path.node.value = format(path.node.value);
      }
    )
  };

  return { visitor };
};
