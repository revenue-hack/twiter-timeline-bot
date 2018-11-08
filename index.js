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
    count: 10,
    include_rts: true,
    exclude_replies: true
  };

  client.get('statuses/home_timeline', params, (err, tweets, res) => {
    if (!err) {
      for (let i = 0; i < tweets.length; i++) {
        if (filterTweets(tweets[i], filterJson)) {
          console.log(tweets[i])
        }
      }
    } else {
      console.log(err);
    }
  });
}

const filterJson = require('./word_store.json');

getTweets(filterJson);

