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


var spotifySong = function() {
    spotify.search({ type: "track", query: term }, function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }
        console.log(data);
    });
}

// var movieSearch = function() {

// }


if (command === "spotify-this-song") {
    // var songToSpotify = new 
    spotifySong();
    console.log("Command entered: " + command);
    console.log("Song search: " + term);
} else if (command === "movie-this") {
    console.log("Command entered: " + command);
    console.log("Movie search: " + term);
} else if (command === "do-what-it-says") {
    console.log("Command entered: " + command);
}