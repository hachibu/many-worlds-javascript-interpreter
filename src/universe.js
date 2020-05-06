var _ = require('lodash'),
    u = require('util');

class Universe {
  constructor() {
    this.depth = 0;
  }

  insert(tree) {
    tree.depth = this.depth + 1;
    if (!this.children) {
      this.children = [];
    }
    this.children.push(tree);
  }

  each(f) {
    f(this);
    _.each(this.children, (child) => child.each(f));
  }

  print() {
    console.log(u.inspect(this, false, null, true));
  }
}

module.exports = Universe;
