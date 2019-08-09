const inspect = Symbol.for('nodejs.util.inspect.custom');

class Identity {
  constructor(x) {
    this.$value = x;
  }

  static of(x) {
    return new Identity(x);
  }

  map(f) {
    return Identity.of(f(this.$value));
  }

  [inspect]() {
    return `Identity(${this.$value})`;
  }
}

module.exports = Identity;