const express = require('express');
const io = require('socket.io')();
const http = require('http');
const port = process.env.Port || 3000;


const app = express();
const server = http.createServer(app);
// const io = socketIO.listen(server);

io.on('connection', (client) => {
    client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
            client.emit('timer', new Date(),'TestTimers');
        }, interval);
    });
});

const portIO = 8010;
io.listen(portIO);
console.log('listening on port ', portIO);

app.get('/api/customers', (req, res) => {
   const customers =
      { id: 14566565, firstName: 'Alex', lastName: 'Test' };
   res.header('Access-Control-Allow-Origin', req.headers.origin);
   res.json(customers);
});



server.listen(port, () => console.log(`server started on port ${port}`));
