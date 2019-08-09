const { match, prop, add, compose, map } = require('ramda');
const Identity = require('./Identity');
const Maybe = require('./Maybe');

Identity.of(2).map(v => v + 2);

Identity.of('flamethrowers').map(s => s.toUpperCase());

Maybe.of('Malkovich Malkovich').map(match(/a/gi));
Maybe.of(null).map(match(/a/gi));
Maybe.of({ name: 'Boris' })
  .map(prop('age'))
  .map(add(10));
Maybe.of({ name: 'Dinah', age: 14 }).map(
  compose(
    add(10),
    prop('age')
  )
);

// safeHead :: [a] -> Maybe a
const safeHead = xs => Maybe.of(xs[0]);

// streetName :: Object -> Maybe String
const streetName = compose(
  map(prop('street')),
  safeHead,
  prop('addresses')
);

console.log(
  streetName({ addresses: [] }),
  streetName({
    addresses: [
      {
        street: 'Shady Ln',
        number: 4201
      }
    ]
  })
);
