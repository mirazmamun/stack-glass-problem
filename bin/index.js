#!/usr/bin/env node
const { prompt } = require('enquirer');
const Stack = require('./../src/stack');

const questions = [
  {
    type: 'input',
    name: 'dimension',
    message: 'What is the dimension of the stack',
    initial: 4,
    validate: (value) => {
      value = Number(value);
      if (!value) {
        return prompt.styles.danger(`Must pass a valid value for dimension, between 1 and preferably 100(for computation)`);
      }
      return true;
    }
  },
  {
    type: 'input',
    name: 'capacity',
    message: 'Capacity of each node in MiliLitres?',
    initial: 250,
    validate: (value, state, item, index) => {
      value = Number(value);
      if (!value < 0) {
        return `Must pass a valid value for capacity`;
      }
      return true;
    }
  },
  {
    type: 'input',
    name: 'totalpour',
    message: 'How much liquid to pour in Litres?',
    initial: 0.5,
    validate: (value, state, item, index) => {
      value = Number(value);
      if (!value < 0) {
        return `Must pass a valid value for total volume of liquid poured`;
      }
      return true;
    }
  },
  {
    type: 'input',
    name: 'row',
    message: 'Row index of the target glass, start from zero(0)?',
    initial: 0,
    validate: (value, state, item, index) => {
      value = Number(value);
      if (!value < 0) {
        return `Must pass a valid value for row, between 0 and dimension value`;
      }
      return true;
    }
  },
  {
    type: 'input',
    name: 'column',
    message: 'Column index of the target glass, start from zero(0)?',
    initial: 0,
    validate: (value) => {
      value = Number(value);
      if (!value < 0) {
        return `Must pass a valid value for column, between 0 and dimension value`;
      }
      return true;
    }
  }
];

prompt(questions)
  .then(res => {
    let stack = new Stack(res.dimension, res.capacity, res.totalpour);
    stack.init().calculate();
    console.log(`The amount of liquid at ${res.row}, ${res.column} is ${stack.getItem(res.row, res.column, true)}`);
    console.log(`Here is the capcacity graph`);
    stack.print(true);
  })
  .catch(err => {
    console.error(`Error in execution ${err.message}`);
    process.exit(1);
  });
