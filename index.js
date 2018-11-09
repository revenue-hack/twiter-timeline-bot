'use strict';
const { tweets } = require('./income.js');

exports.twitter = (request, response) => {
  tweets();
  response.status(200).send('ok!');
};

exports.event = (event, callback) => {
  callback();
};
