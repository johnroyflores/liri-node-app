var keys = require('./keys.js');
var twit = require('twitter');
var spot = require('spotify');
var omdb = require('omdb');
var fs = require('fs');

var client = new twit({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    })
    /*var spotter = new spot ({
        client_id: keys.spotifyKeys.client_id,
        client_secret: keys.spotifyKeys.client_secret,
    })*/

if (process.argv[2] === "spotify-this-song") {
    spotifyIt();
}
if (process.argv[2] === "my-tweets") {
    myTweets();
}
if (process.argv[2] === "movie-this") {
    movieSearch();
}

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


function spotifyIt() {
    var spotQuery = process.argv[3];
    if (spotQuery == undefined) {
        spotQuery = "what's my age again";
    }
    spot.search({ type: 'track', query: spotQuery }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        // Print the info
        else {
            console.log("Song name: " + data.tracks.items[0].name);
            console.log("Artist name: " + data.tracks.items[0].artists[0].name);
            console.log("Album name: " + data.tracks.items[0].album.name);
            console.log("Preview URL: " + data.tracks.items[0].preview_url);
        }


    });

}

function movieSearch() {

    var omdbQuery = process.argv[3];
    if (omdbQuery == undefined) {
        omdbQuery = "Mr. Nobody";
    }

    omdb.get({ title: omdbQuery}, true, function(err, movie) {
    if(err) {
        return console.error(err);
    }
 
    if(!movie) {
        return console.log('Movie not found!');
    }
 
    console.log('%s (%d) %d/10', movie.title, movie.year, movie.imdb.rating);
    console.log(movie.plot);
 
});

}

