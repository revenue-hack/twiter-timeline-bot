const twitter = require('twitter')
export class Twitter {
  var client: Object
  constructor(params: Object) {
    this.client = new twitter(params)
  }

  public getTweets(): void {
    const params = {
      screen_name: 'Twitter',
      count: 10,
      include_rts: true,
      exclude_replies: true
    }

    this.client.get('statuses/home_timeline', params, (err, tweets, res) => {
      if (!err) {
        for (let i = 0; i < tweets.length; i++) {
          console.log(tweets[i].text)
        }
      } else {
        console.log(err)
      }
    })
  }
}
