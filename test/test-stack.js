const test = require('ava');
const Stack = require('../src/stack');
const purdy = require('purdy');


test.skip('returns Stack', t => {
  let stack = new Stack(4);
  stack.init();
  purdy(stack.stackNest, {depth: 6});
  t.true(stack instanceof Stack);
});

test('returns Stack print', t => {
  let stack = new Stack(4);
  stack.init();
  stack.print();
  t.true(stack instanceof Stack);
});