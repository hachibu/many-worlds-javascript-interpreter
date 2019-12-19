var _ = require('lodash');

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
        function misspellPattern(v) {
          var typos = [
            ['an', 'and'],
            ['there', 'their'],
            ['too', 'to'],
            ['too', 'two'],
            ['than', 'then'],
            ['where', 'were'],
            ["we're", 'were'],
            ["you're", 'your'],
            ["it's", 'its'],
            ['your', 'you'],
            ['chose', 'choose'],
          ];
          var typo = _.sample(typos);

          if (choose()) {
            typo = _.reverse(typo);
          }

          var pattern = new RegExp(typo[0], 'i');
          var replacement = typo[1];

          return _.replace(v, pattern, replacement);
        }

        function randomIndex(array) {
          return Math.floor(Math.random() * array.length);
        }

        function miscase(v) {
          var words = _.split(v, ' ');
          var i = randomIndex(words);
          var format = _.sample([
            _.upperFirst,
            _.lowerFirst,
          ]);

          words[i] = format(words[i]);

          return _.join(words, ' ');
        }

        function misspellGeneric(v) {
          var words = _.split(v, ' ');
          var i = randomIndex(words);
          var format = _.sample([
            // Collapse or expand 2 repeated letters
            (w) => w,
            // Vowel swap
            (w) => w,
          ]);

          words[i] = format(words[i]);

          return _.join(words, ' ');
        }

        var format = _.sample([
          miscase,
          misspellPattern,
          misspellGeneric,
        ]);

        path.node.value = format(path.node.value);
      }
    )
  };

  return { visitor };
};

function randomVisitor(...fs) {
  return function(...args) {
    for (var f of fs) {
      if (choose()) {
        f(...args);
      }
    }
  };
}

function choose() {
  var n = 0;
  var m = _.random(10);

  return _.random(n, m) === n;
}

module.exports = plugin;
