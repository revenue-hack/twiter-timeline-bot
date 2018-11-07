require('dotenv').config();
const twitter = require('twitter');
var client = new twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});


const getTweets = () => {
  const params = {
    screen_name: 'Twitter',
    count: 10,
    include_rts: true,
    exclude_replies: true
  };

  client.get('statuses/home_timeline', params, (err, tweets, res) => {
    if (!err) {
      for (let i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text);
      }
    } else {
      console.log(err);
    }
  });
}

getTweets();
