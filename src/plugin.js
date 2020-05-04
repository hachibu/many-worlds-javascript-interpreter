var _ = require('lodash'),
    u = require('./utils'),
    g = require('@babel/generator').default;

function plugin({ types: t }) {
  let visitor = {
    ArrayExpression: u.randomVisitor(
      path => path.node.elements = _.shuffle(path.node.elements)
    ),

    BinaryExpression: u.randomVisitor(
      path => {
        let left = path.node.left;

        path.node.left = path.node.right;
        path.node.right = left;
      },

      path => {
        let operators = {
          bitwise: ['|', '^', '&', '<<', '>>', '>>>'],
          equality: ['==', '!=', '===', '!==', '<', '<=', '>', '>='],
          math: ['+', '-', '*', '/', '%', '**']
        };
        let oldOperator = path.node.operator;
        let newOperator = oldOperator;

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

    CallExpression: u.randomVisitor(
      path => path.node.arguments = _.shuffle(path.node.arguments)
    ),

    LogicalExpression: u.randomVisitor(
      path => {
        let operators = ['&&', '||'];

        path.node.operator = _.sample(operators);
      }
    ),

    ForStatement: u.randomVisitor(
      path => {
        let whileStatement = t.whileStatement(path.node.test, path.node.body);

        whileStatement.body.body.push(path.node.update);

        path.replaceWithMultiple([
          path.node.init,
          whileStatement
        ]);
      }
    ),

    NumericLiteral: u.randomVisitor(
      path => {
        if (path.node.value >= 0) {
          path.node.value += 1;
        }
      },
      path => {
        if (path.node.value >= 1) {
          path.node.value -= 1;
        }
      },
    ),

    UpdateExpression: u.randomVisitor(
      path => {
        switch (path.node.operator) {
          case '++':
            path.node.operator = '--';
            break;
          case '--':
            path.node.operator = '++';
            break;
        }
      }
    ),
  };

  return { visitor };
};

module.exports = plugin;
