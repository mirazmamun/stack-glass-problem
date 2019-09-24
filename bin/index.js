#!/usr/bin/env node
const { prompt } = require('enquirer');

const questions = [
  {
    type: 'input',
    name: 'dimension',
    message: 'What is the dimension of the stack'
  },
  {
    type: 'input',
    name: 'row',
    message: 'Row index of the target glass, start from zero(0)?'
  },
  {
    type: 'input',
    name: 'column',
    message: 'Column index of the target glass, start from zero(0)?'
  }
];

prompt(questions)
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(`Error in execution ${err.message}`);
    process.exit(1);
  });
