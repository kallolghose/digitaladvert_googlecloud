var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'adminpage/public')));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/adminpage/index.html'));
});

// [START server]
// Start the server
server = app.listen(process.env.PORT || 8082, () => {
    port = server.address().port;
    console.log("App listening on port " + port);
});
// [END server]

module.exports = app;