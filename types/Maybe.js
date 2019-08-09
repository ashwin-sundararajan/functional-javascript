const inspect = Symbol.for('nodejs.util.inspect.custom');
class Maybe {
  static of(x) {
    return new Maybe(x);
  }

  constructor(x) {
    this.$value = x;
  }

  get isNothing() {
    return this.$value === null || this.$value === undefined;
  }

  map(fn) {
    return this.isNothing ? this : Maybe.of(fn(this.$value));
  }

  [inspect]() {
    return this.isNothing ? 'Nothing' : `Just(${JSON.stringify(this.$value)})`;
  }
}

module.exports = Maybe;
