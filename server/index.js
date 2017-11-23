var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var events = {
    OnDisconnect: 'disconnect',
    OnMessageSent: 'message sent',
    SendUserDisconnect: 'user disconnect',
    SendUserConnect: 'user connect',
    SendMessage: 'message received'
};

var numberOfConnection = 0;

io.on('connection', function(socket){
    numberOfConnection += 1;
    console.log('A user connected. Total=' + numberOfConnection);
    io.emit(events.SendUserConnect, numberOfConnection);

    socket.on(events.OnDisconnect, function() {
       numberOfConnection -= 1;
       console.log('A user disconnected. Total=' + numberOfConnection);
       io.emit(events.SendUserDisconnect, numberOfConnection);
       socket.disconnect(true);
    });

    socket.on(events.OnMessageSent, function(username, message) {
        console.log('Message sent - ' + username + ' - ' + message);
        io.emit(events.SendMessage, username, message);
    })
});

http.listen(3000);