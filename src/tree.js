var _ = require('lodash');

class Tree {
  constructor() {
    this._children = [];
    this._data = undefined;
    this._depth = 0;
  }

  set data(data) {
    this._data = data;
  }

  get data() {
    return this._data;
  }

  set depth(depth) {
    this._depth = depth;
  }

  get depth() {
    return this._depth;
  }

  insert(tree) {
    tree.depth = this.depth + 1;
    this._children.push(tree);
  }

  each(f) {
    f(this);
    _.each(this._children, (child) => child.each(f));
  }
}

module.exports = Tree;
