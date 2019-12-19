var _ = require('lodash');

function choose() {
  var n = 0;
  var m = _.random(100);

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
      path.node.elements = _.shuffle(path.node.elements);
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
      var format = _.sample([
        _.camelCase,
        _.kebabCase,
        _.lowerCase,
        _.snakeCase,
        _.startCase,
        _.upperCase,
      ]);

      path.node.value = format(path.node.value);
    })
  };

  return { visitor };
};
