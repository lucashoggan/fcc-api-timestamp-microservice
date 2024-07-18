// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  if (req.params.date.length ==10) {
    let unix_time = Date.parse(req.params.date)
    let utc_time = new Date(unix_time).toUTCString()
    res.json({unix:unix_time, utc:utc_time})
  } else {
    let unix_time = Number.parseInt(req.params.date)
    let utc_time = new Date(unix_time).toUTCString()
    res.json({unix:unix_time, utc:utc_time})
  }
  
});




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
