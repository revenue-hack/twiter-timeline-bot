# twitter-timeline-bot

## setup
```
yarn install
```

## desc
slack incoming hook's code is income.js.
cloud function's code is index.js, so I use serverless framework.
slack bot's code is bot.js.

## batch incoming
https://cron-job.org
every 10 minutes

## bot
```
node bot.js
```
write to slack
@bot ネタある？ or hoge

