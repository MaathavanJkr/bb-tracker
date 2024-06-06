var express = require("express");
var app = express();
const cors = require('cors')
var mysql = require('mysql');
const config = require("./config");

var db = mysql.createPool(config.sql);
db.on("connection", (connection) => {
  console.log("Database connected!");

  connection.on("error", (err) => {
    console.error(new Date(), "MySQL error", err.code);
  });

  connection.on("close", (err) => {
    console.error(new Date(), "MySQL close", err);
  });
});

global.db = db;


app.use(cors())

// Handle post requests
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/player', require('./routes/playerRoutes'))
app.use('/api/shot', require('./routes/shotRoutes'))

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});