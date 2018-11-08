require('dotenv').config();
const { findTweets, filterJson } = require('./common.js');
const request = require('request');
const sprintf = require('sprintf-js').sprintf;

findTweets(filterJson).then((filterdTweets) => {
  var sendMessage = "";
  if (filterdTweets) {
    filterdTweets.forEach((tweet) => {
      sendMessage += sprintf("%s: %s\n", tweet.user, tweet.text)
    });

    request.post({
      uri: process.env.INCOME_URI,
      headers: { 'Content-Type': 'application/json' },
      json: {
        username: '情報だよー',
        icon_emoji: ':ghost:',
        text: sendMessage
      }
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        console.log(body);
      } else {
        console.log('error');
      }
    });
  }
}).catch((err) => {
  console.log(err);
});

