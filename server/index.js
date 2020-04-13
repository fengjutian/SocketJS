var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}


// io.on('connection', function (socket) {
//     var msgArr = null
//     socket.emit('news', { hello: 'world' });
//     socket.on('my other event', function (data) {
//         console.log(data);
//     });
// });

const myRoom = io.of('/my-room')
myRoom.on('connection', function (socket) {
    var msgArr = []
    socket.on('sendMsg', function (data) {
        msgArr.push(data)
        socket.emit('acceptMsg', msgArr)  
    });
});


