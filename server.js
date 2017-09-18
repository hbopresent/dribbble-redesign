var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
// path
app.use("/app", express.static(__dirname + "/app/"));

app.get("/", function(req, res) {
  res.sendfile("index.html");
});

// server port
http.listen("56565", function() {
  console.log("Dribbble is on!!");
});
