const botkit = require("botkit");
const sprintf = require('sprintf-js').sprintf;
require('dotenv').config();
const twitter = require('twitter');
var client = new twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

const filterTweets = (tweet, filterJson) => {
  const users = filterJson.users;
  const userResult = users.filter(user => user === tweet.user);
  if (userResult.length > 0) return true;

  const words = filterJson.words;
  const wordResult = words.filter(word => tweet.text.indexOf(word) > -1 || tweet.text.indexOf(word.toLowerCase()) > -1 || tweet.text.indexOf(word.toUpperCase()) > -1);
  return wordResult.length > 0;
}

const getTweets = (filterJson) => {
  const params = {
    screen_name: 'Twitter',
    count: 100,
    include_rts: true,
    exclude_replies: true
  };

  return client.get('statuses/home_timeline', params, (err, tweets, res) => {
    if (!err) {
      var filterdTweets = [];
      for (let i = 0; i < tweets.length; i++) {
        console.log("２２ほほほ", filterTweets(tweets[i], filterJson));
        if (filterTweets(tweets[i], filterJson)) {
          console.log("あああああ", tweets[i].text);
          filterdTweets.push(tweets[i]);
        }
      }
      console.log("フィルター", filterdTweets);
      return filterdTweets;
    } else {
      console.log(err);
      return null;
    }
  });
}

const filterJson = require('./word_store.json');


const controller = botkit.slackbot({
    debug: true,
});

controller.spawn({ token: process.env.BOT_ACCESS_KEY }).startRTM((err, bot, payload) => {
    if (err) {
        throw new Error(err);
    }
});


controller.hears(["ネタある？"], ["direct_mention"], (bot, message) => {
  const tweets = getTweets(filterJson);
  console.log("ツイート", tweets);
  if (tweets) {
    var messages = "";
    tweets.forEach((tweet) => {
      messages += sprintf("%s: %s\n", tweet.user, tweet.text)
    });
    bot.reply(message, tweets);
  } else bot.reply(message, "今はないな～");
});

