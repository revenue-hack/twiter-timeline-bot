const { findTweets } = require('./common.js');
const botkit = require("botkit");
const sprintf = require('sprintf-js').sprintf;
require('dotenv').config();
const controller = botkit.slackbot({
    debug: true,
});

controller.spawn({ token: process.env.BOT_ACCESS_KEY }).startRTM((err, bot, payload) => {
    if (err) {
        throw new Error(err);
    }
});

// bot
controller.hears(["ネタある？", "hoge"], ["direct_mention"], (bot, message) => {
  findTweets(filterJson).then((filterdTweets) => {
    if (filterdTweets) {
      var sendMessage = "";
      filterdTweets.forEach((tweet) => {
        sendMessage += sprintf("%s: %s\n", tweet.user, tweet.text)
      });
      bot.reply(message, sendMessage);
    } else bot.reply(message, "今はないな～");
  })
  .catch((err) => {
    console.log(err);
  });
});


