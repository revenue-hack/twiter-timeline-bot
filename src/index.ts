import { Twitter } from './twitter'
declare function require(x: string): any
require('dotenv').config()

const params: Object = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
}

const twitter = new Twitter(params)
twitter.getTweets()

