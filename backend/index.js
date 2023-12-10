var express = require("express");
var app = express();
var mysql = require('mysql');
const config = require("./config");

var db = mysql.createConnection(config.sql);
db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
global.db = db;


// Handle post requests
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api/player', require('./routes/player'))
app.use('/api/shot', require('./routes/shot'))

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});