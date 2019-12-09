let express = require('express');
let app = express();
let host = 3333
let server = app.listen(host, '0.0.0.0')

app.use(express.static('public'));
app.use(/.*[^\/]$/, function(req, res, next) {
  res.redirect(req.originalUrl + '/$')
});

console.log("server running");

let socket = require("socket.io");
let io = socket(server);

io.sockets.on("connection", newConnection);

function newConnection(socket) {
  socket.on("mouse", mouseMsg);

  function mouseMsg(data) {
    socket.broadcast.emit("mouse", data);
  }
}