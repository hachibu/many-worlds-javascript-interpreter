var _ = require('lodash');

// https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-writing-your-first-babel-plugin
// https://github.com/babel/babel/blob/master/packages/babel-parser/ast/spec.md

function visit(f) {
  return function() {
    return _.random(0, 1) === 0 ? f(...arguments) : null;
  };
}

module.exports = function({ types: t }) {
  var visitor = {
    ArrayExpression: visit(path => {
      path.node.elements = _.random(0, 1) === 0 ?
        _.shuffle(path.node.elements) :
        [];
    }),
    BinaryExpression: visit(path => {
      var left = path.node.left;

      path.node.left = path.node.right;
      path.node.right = left;
    }),
    CallExpression: visit(path => {
      path.node.arguments = _.shuffle(path.node.arguments);
    }),
    NumericLiteral: visit(path => {
      path.node.value += 1;
    }),
    StringLiteral: visit(path => {
      var str = path.node.value;

      path.node.value = _.replace(str, _.sample(str), '');
    })
  };

  return { visitor };
};
