var _ = require('lodash');
var { choose, randomIndex, randomVisitor } = require('./utils');

function plugin({ types: t }) {
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
    NumericLiteral: randomVisitor(
      (path) => {
        if (path.node.value >= 0) {
          path.node.value += 1;
        }
      },
      (path) => {
        if (path.node.value >= 1) {
          path.node.value -= 1;
        }
      },
    ),
    StringLiteral: randomVisitor(
      (path) => {
        function misspell(v) {
          var typos = [
            ['the', 'teh'],
            ['there', 'their'],
            ['too', 'two'],
            ['than', 'then'],
            ['where', 'were'],
            ["we're", 'were'],
            ["you're", 'your'],
            ["it's", 'its'],
            ['your', 'you'],
            ['o', 'oo'],
            ['a', 'e'],
            ['e', 'i'],
            ['i', 'o'],
            ['o', 'u'],
            ['u', 'o'],
          ];

          _.each(typos, (typo) => {
            if (choose()) {
              typo = _.reverse(typo);
            }

            var pattern = new RegExp(typo[0], 'ig');
            var replacement = typo[1];

            v = _.replace(v, pattern, replacement);
          });

          return v;
        }

        function miscase(v) {
          var words = _.split(v, ' ');
          var indices = [
            randomIndex(words),
            randomIndex(words),
          ];

          _.each(indices, (i) => {
            var format = _.sample([
              _.upperFirst,
              _.lowerFirst,
              (w) => ' ' + w,
              (w) => w + ' ',
            ]);
            words[i] = format(words[i]);
          });

          return _.join(words, ' ');
        }

        var format = _.sample([
          miscase,
          misspell,
        ]);

        path.node.value = format(path.node.value);
      }
    )
  };

  return {
    visitor
  };
};

module.exports = plugin;
