const test = require('ava');
const Dispenser = require('../src/dispenser');

test.beforeEach(t => {
  let dispenser = new Dispenser(4);
  t.context = {
    dispenser
  };
})

test('returns Dispenser', t => {
  t.true(t.context.dispenser instanceof Dispenser);
});