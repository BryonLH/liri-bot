require("dotenv").config();

var keys = require("./keys.js");
var moment = require("moment");
var axios = require("axios");
var dotenv = require("DotEnv");
var spotifyapi = require("Node-Spotify-API");

var spotify = new Spotify(keys.spotify);

// console.log(spotify);