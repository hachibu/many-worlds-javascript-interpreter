var _ = require('lodash');

function flipCoin() {
  return _.random(0, 1) === 0;
}

function maybeVisit(f) {
  return function() {
    return flipCoin() ? f(...arguments) : null;
  };
}

module.exports = function({ types: t }) {
  var visitor = {
    ArrayExpression: maybeVisit(path => {
      path.node.elements = flipCoin() ?
        _.shuffle(path.node.elements) :
        [];
    }),
    BinaryExpression: maybeVisit(path => {
      var left = path.node.left;

      path.node.left = path.node.right;
      path.node.right = left;
    }),
    CallExpression: maybeVisit(path => {
      path.node.arguments = _.shuffle(path.node.arguments);
    }),
    NumericLiteral: maybeVisit(path => {
      var n = flipCoin() ? 1 : -1;

      path.node.value += n;
    }),
    StringLiteral: maybeVisit(path => {
      var str = path.node.value;

      path.node.value = _.replace(str, _.sample(str), '');
    })
  };

  return { visitor };
};
