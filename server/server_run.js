const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');
const publcPath = path.join(__dirname, '../src');
const port = process.env.Port || 3000;


const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// app.use(express.static(publcPath));


app.get('/api/customers', (req, res) => {
   const customers = [
      { id: 1, firstName: 'Alex', lastName: 'Test' }
   ];

   res.json(customers);
});

io.on('connection', () => {
   console.log('IO connection');
});

server.listen(port, () => console.log(`server started on port ${port}`));
