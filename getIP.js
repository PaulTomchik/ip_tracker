#!/usr/local/bin/node

"use strict";

var fs = require("fs"),
    request = require("request"),

    config = JSON.parse(fs.readFileSync("config.json")),

    getURL = "http://" + config.ipServerIP + ':' + config.ipServerPort + '/get/ip',

    getKey = encodeURIComponent(config.getKey);


request.get(
    (getURL + "?key=" + getKey),
    function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(response.body);
        } else {
            console.log(error);
        }
    }
);
