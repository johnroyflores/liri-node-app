var keys = require('./keys.js');
var twit = require('twitter');

var client = new twit({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    })

function myTweets() {
    var params = {
        screen_name: 'johnisdelicious',
        count: 20,
        trim_user: true
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (i = 0; i < 20; i++) {
                var returnItems = ('\n' + tweets[i].created_at + '\n' + tweets[i].text);
                console.log(returnItems);
              
            }
        };
    });
}
if (process.argv[2] === "my-tweets"){
myTweets();
}