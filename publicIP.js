#!/usr/local/bin/node

"use strict";

var fs = require("fs"),
    request = require("request"),
    publicIp = require('public-ip'),

    config = JSON.parse(fs.readFileSync("config.json")),

    postURL = "http://" + config.ipServerIP + ':' + config.ipServerPort + '/post/ip' ;


setInterval(function () {
    publicIp.v4(function (err, ip) {
        if (err) {
            return console.log(err.stack);
        }
        if (ip !== config.ip) {
            console.log("new ip");

            config.ip = ip;
            fs.writeFileSync("config.json", JSON.stringify(config, null, 2));
            
            request.post(
                postURL,
                { form: { password: config.postPassword, ip: ip } },
                function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        console.log(body);
                    } else {
                        console.log(error);
                    }
                }
            );
        }
    });
}, 300000);
