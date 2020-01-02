var _ = require('lodash');

function choose() {
  var n = 0;
  var m = _.random(8);
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

function randomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

module.exports = {
  choose,
  randomIndex,
  randomVisitor
};
