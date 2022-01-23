const express = require('express');
var cors = require('cors')
const http = require('http');
const socket = require('socket.io');

const port = process.env.PORT || 8000;

var app = express();
app.use(cors())
const server = http.createServer(app)
const io = socket(server)

app.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>")
})


io.on('connection', function (socket) {
    socket.on('joined', function (uuid) {
      console.log(`${uuid} connected`)
    });

    socket.on('MOVE', function (moveLocation, currentLocation) {
        socket.broadcast.emit("MOVE", moveLocation, currentLocation);
    }); 
});

app.listen(port, () => { console.log('Our App Is Up And Running!'); });