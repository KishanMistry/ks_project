const io = require('socket.io')(3000, {
  cors: {
    origin: '*',
  }
})

io.on('connection', socket => {
  console.log('Connected');
  socket.on('send-chat-message', message => {    
    socket.broadcast.emit('chat-message', message)
  })
})

//===========================
/*const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
//const io = require('socket.io')(server, { allowEIO3: true} );


// Initalize socket io.
const io = require('socket.io')(server, {
  
  cors: {
    // for server use this url accoring staging or live " https://stage.lightworkerz.com/nodejs "
    origin: "http://localhost",// change with your domain url DON'T ADD / AT END OF URL == In local remove nodejs keyword
    // origin: 'https://stage.lightworkerz.com/nodejs',// change with your domain url DON'T ADD / AT END OF URL == In local remove nodejs keyword
    methods: ["GET", "POST"],
    allowedHeaders: ["Access-Control-Allow-Origin"],
    credentials: true
  },
  allowEIO3: true
  // path: '/socket.io'
});



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/chat.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('loginuser', function(data){
        socket.nickname = data; 
        users.push(data);
        io.to('login_users').emit('set_online_users', {'users' : users, 'c_user' : socket.nickname , 'ac_type' : 'login'});            
        socket.join(data);
        socket.join('login_users');    
    });


    socket.on('chat message', (msg) => {
        //console.log('message: ' + msg);
        //io.emit('chat message', msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});*/