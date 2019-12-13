import Generator from '../server/DataGenerator/Generator';

const express = require('express');
const io = require('socket.io')();
const http = require('http');
const port = process.env.Port || 3000;
const app = express();
const server = http.createServer(app);

io.on('connection', (client) => {
    client.on('setGraphsData', (interval, data) => {
        console.log('setGraphsDataEvent', data);
        const generator = new Generator();
        setInterval(() => {
            const dataGraphs = generator.stubDataGraphsGenerator(5);
            io.emit('getGraphsData', { dataGraphs});
        }, interval);
    });


});


const portIO = 8010;
io.listen(portIO);

server.listen(port, () => console.log(`server started on port ${port}`));
