require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("Node-Spotify-API");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var lineBreak = `\n<--=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->\n`

// Variables for what is entered into the Terminal
var command = process.argv[2];
var term = process.argv.slice(3).join(" ");

// Search Spotify for a song by title and return results
var spotifySong = function (track) {
    spotify.search({ type: "track", query: track }, function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }
        var responseString = `
Artist: ${data.tracks.items[0].artists[0].name}
Song: ${track}
Album: ${data.tracks.items[0].album.name}
URL: ${data.tracks.items[0].preview_url}`;
        console.log(lineBreak);
        console.log(responseString);
        writeToFile(`${lineBreak}${command} ${term}\n ${responseString}`);
    });
}

// Search OMDB for a movie by title an return results
var movieSearch = function (term) {
    axios
        .get(`http://www.omdbapi.com/?apikey=753acd53&t=${term}`)
        .then(function (response) {
            var responseString = `
Title: ${response.data.Title}
Release Year: ${response.data.Year}
IMDB Rating: ${response.data.imdbRating}
Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}
Country: ${response.data.Country}
Language: ${response.data.Language}
Plot: ${response.data.Plot}
Cast: ${response.data.Actors}
            `;
            console.log(lineBreak);
            console.log(responseString);
            writeToFile(`${lineBreak}${command} ${term}\n ${responseString}`);
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Do the "do what it says" function
var doWhatItSays = function () {
    fs.readFile("./random.txt", "utf8", function (err, data) {
        if (err) return console.log(err);
        var tempArray = data.split(",");
        command = tempArray[0];
        term = tempArray[1];
        // console.log(command);
        // console.log(term);
        runProgram();
    });
}

// This function will write the results and the command and search term entered
var writeToFile = function (responseString) {
    fs.appendFile("log.txt", responseString, function (err) {
        if (err) return console.log(er);
    })
}

var runProgram = function () {
    if (command === "spotify-this-song") {
        spotifySong(term);
    } else if (command === "movie-this") {
        if (term === "") {
            movieSearch("Mr. Nobody");
        } else {
            movieSearch(term);
        }
    } else if (command === "do-what-it-says") {
        // console.log("Command entered: " + command);
        doWhatItSays();
    } else if (command === "Hi") {
        console.log("Hi! I can't wait to help you find a movie or song!")
    } else {
        console.log("I'm sorry, I do not recognize that command")
    }
}
runProgram();