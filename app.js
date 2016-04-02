"use strict";


var fs = require('fs') ,
    app = require('express')() ,
    bodyParser = require('body-parser');


var config = JSON.parse(fs.readFileSync("config.json")),
    getPassword = config.getPassword ,
    postPassword = config.postPassword ,
    latestIP = null;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/get/ip', function (req, res) {
    var key = req.query && req.query.key;

    if (key === getPassword) {
        return res.status(200).send({ ip: latestIP });
    } else {
        return res.status(403).send({ error: "wrong key." });
    }
});


app.post('/post/ip', function (req, res) {
    var password = req.body && req.body.password,
        ip       = req.body && req.body.ip;

    if (password === postPassword) {
        latestIP = ip;
        console.log("UPDATING");
        return res.status(200).send({ message: "Updated the IP." });
    } else {
        return res.status(403).send({ error: "!(U authorized);" });
    }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
