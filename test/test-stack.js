const test = require('ava');
const Stack = require('../src/stack');
const Dispenser = require('../src/dispenser');
const purdy = require('purdy');

test.beforeEach(t => {
  let stack = new Stack(4);
  stack.init();
  t.context = {
    stack
  };
})

test.skip('returns Stack', t => {
  purdy(t.context.stack.stackNest, {depth: 6});
  t.true(t.context.stack instanceof Stack);
});

test.skip('returns Stack print', t => {
  t.context.stack.print();
  t.pass(`Printed the stack`);
});

test.skip('returns Stack calculate', t => {
  t.context.stack.nodeCapacity = 250;
  t.context.stack.totalDump = 800;
  t.context.stack.calculate();
  purdy(t.context.stack.stackNest, {depth: 6});
  t.context.stack.print(true);
  t.pass(`Calculated the stack`);
});

test('returns Stack item', t => {
  t.context.stack.nodeCapacity = 250;
  t.context.stack.totalDump = 800;
  let item = t.context.stack.calculate().getItem(1,1);
  purdy(t.context.stack.stackNest, {depth: 6});
  console.log(typeof item);
  t.true(item instanceof Dispenser);
  t.true(item.fill == 250);
});