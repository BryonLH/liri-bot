require("dotenv").config();

var keys = require("./keys.js");
var moment = require("moment");
var axios = require("axios");
var dotenv = require("DotEnv");
var Spotify = require("Node-Spotify-API");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");


// console.log(spotify);

var command = process.argv[2];
var term = process.argv.slice(3).join(" ");

// Search Spotify for a song by title and return results
var spotifySong = function (track) {
    spotify.search({ type: "track", query: track }, function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }
        console.log(`
Artist: ${data.tracks.items[0].artists[0].name}
Song: ${track}
Album: ${data.tracks.items[0].album.name}
URL: ${data.tracks.items[0].preview_url}`);
    });
}

// Search OMDB for a movie by title an return results
// var movieSearch = function() {

// }

// Do the "do what it says" function



if (command === "spotify-this-song") {
    spotifySong(term);
} else if (command === "movie-this") {
    movieSearch();
    console.log("Command entered: " + command);
    console.log("Movie search: " + term);
} else if (command === "do-what-it-says") {
    console.log("Command entered: " + command);
}