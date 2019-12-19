var _ = require('lodash');

function choose() {
  var n = 0;
  var m = _.random(10);

  return _.random(n, m) === n;
}

function maybeVisit(f) {
  return function() {
    return choose() ? f(...arguments) : null;
  };
}

module.exports = function({ types: t }) {
  var visitor = {
    ArrayExpression: maybeVisit(path => {
      path.node.elements = choose() ?
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
      var n = choose() ? 1 : -1;

      path.node.value += n;
    }),
    StringLiteral: maybeVisit(path => {
      var str = path.node.value;

      path.node.value = _.replace(str, _.sample(str), '');
    })
  };

  return { visitor };
};
