var _ = require('lodash');

function maybeVisit(f) {
  return function() {
    return _.random(0, 1) === 0 ? f(...arguments) : null;
  };
}

module.exports = function({ types: t }) {
  var visitor = {
    ArrayExpression: maybeVisit(path => {
      path.node.elements = _.random(0, 1) === 0 ?
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
      path.node.value += 1;
    }),
    StringLiteral: maybeVisit(path => {
      var str = path.node.value;

      path.node.value = _.replace(str, _.sample(str), '');
    })
  };

  return { visitor };
};
