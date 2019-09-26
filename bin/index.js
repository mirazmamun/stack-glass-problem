#!/usr/bin/env node

const { prompt } = require('enquirer');
const Stack = require('./../src/stack');

/**
 * Validate if the value is positive integer
 * @param {number} value 
 * @returns {any}   Boolean for valid else sting indicating error
 */
let validatePositiveInteger = (value) => {
  value = Number(value);
  if (!value < 0 || !Number.isInteger(value)) {
    return `Must pass a valid value`;
  }
  return true;
}

const questions = [
  {
    type: 'input',
    name: 'dimension',
    message: 'What is the dimension (or row count) of the stack',
    initial: 4,
    validate: (value) => {
      return validatePositiveInteger(value);
    }
  },
  {
    type: 'input',
    name: 'capacity',
    message: 'Capacity of each glass (in MilliLitres) (must be positive integer)?',
    initial: 250,
    validate: (value, state, item, index) => {
      return validatePositiveInteger(value);
    }
  },
  {
    type: 'input',
    name: 'totalpour',
    message: 'How much liquid to pour (in Litres) (must be real positive number e.g. positive integer or decimal)?',
    initial: 0.5,
    validate: (value, state, item, index) => {
      value = Number(value);
      if (!value < 0 || value == NaN) {
        return `Must pass a valid value`;
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
      return validatePositiveInteger(value);
    }
  },
  {
    type: 'input',
    name: 'column',
    message: 'Column index of the target glass, start from zero(0)?',
    initial: 0,
    validate: (value) => {
      return validatePositiveInteger(value);
    }
  }
];

prompt(questions)
  .then(res => {
    try {
      let stack = new Stack(res.dimension, res.capacity, res.totalpour);
      stack.init().calculate();
      console.log(`The amount of liquid at ${res.row}, ${res.column} is ${stack.getItem(res.row, res.column, true)}`);
      console.log(`Here is the indicative disribution graph`);
      stack.print(true);
    } catch (err) {
      console.error(`ERROR: error while running Stack construction. The details are: ${err.message}`);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error(`ERROR: in execution. Details are: ${err.message || `unknown error`}`);
    process.exit(1);
  });