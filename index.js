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
  if (new Date(req.params.date).toUTCString() != "Invalid Date") {
    let date = new Date(req.params.date)
    let unix = Date.parse(req.params.date)
  
    res.json({unix:unix, utc:date.toUTCString()})
  } else if (req.params.date.length == 13) {
    let unix = Number.parseInt(req.params.date)
    let date = new Date(unix)
    res.json({unix:unix, utc:date.toUTCString()})
  } else {
    res.json({error: "Invalid Date"})
  }
  
});

app.get("/api", (req, res) => {
  let unix = Date.now()
  let date = new Date(unix)
  res.json({unix:unix, utc:date})
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
