require('dotenv').config();
const hasWantTweet = (tweet, filterJson) => {
  const users = filterJson.users;
  const userResult = users.filter(user => user === tweet.user);
  if (userResult.length > 0) return true;

  const words = filterJson.words;
  const wordResult = words.filter(word => tweet.text.indexOf(word) > -1 || tweet.text.indexOf(word.toLowerCase()) > -1 || tweet.text.indexOf(word.toUpperCase()) > -1);
  return wordResult.length > 0;
}

const twitter = require('twitter');
const client = new twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

const findTweets = (filterJson) => {
  const params = {
    screen_name: 'Twitter',
    count: 100,
    include_rts: true,
    exclude_replies: true
  };
  return new Promise((response, reject) => {
    client.get('statuses/home_timeline', params, (err, tweets, res) => {
      if (!err) {
        var filterdTweets = [];
        for (let i = 0; i < tweets.length; i++) {
          if (hasWantTweet(tweets[i], filterJson)) {
            filterdTweets.push(tweets[i]);
          }
        }
        response(filterdTweets);
      } else {
        reject(err)
      }
    });
  });
}

const filterJson = require('./word_store.json');
module.exports = {
  filterJson: filterJson,
  findTweets: findTweets
};

