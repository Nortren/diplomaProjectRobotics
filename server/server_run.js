const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const port = process.env.Port || 3000;


const app = express();
const server = http.createServer(app);
const io = socketIO.listen(server);

// app.use(express.static(publcPath));


app.get('/api/customers', (req, res) => {
   const customers =
      { id: 1165, firstName: 'Alex', lastName: 'Test' };
   res.header('Access-Control-Allow-Origin', req.headers.origin);
   res.json(customers);
});

const connections = [];

io.on('connection', function(socket) {
   console.log('Success connection');
   connections.push(socket);

   socket.on('disconnect', function(data) {
      connections.splice(connections.indexOf(socket), 1);
       console.log('Success disconnect');
   });
});

server.listen(port, () => console.log(`server started on port ${port}`));
