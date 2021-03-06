import SensorGenerator from './DataGenerator/SensorGenerator';
import StatusGenerator from './DataGenerator/StatusGenerator';
import ScreenplayGenerator from "./DataGenerator/ScreenplayGenerator";

const express = require('express');
const io = require('socket.io')();
const http = require('http');
const port = process.env.Port || 3000;
const app = express();
const server = http.createServer(app);

io.on('connection', (client) => {
    client.on('setGraphsData', (interval, data) => {
        console.log('setGraphsDataEvent', data);
        const generator = new StatusGenerator();
        setInterval(() => {
            const dataGraphs = generator.stubDataGraphsGenerator(6);
            io.emit('getGraphsData', {dataGraphs});
        }, interval);
    });

    client.on('setChartData', (interval, data) => {
        console.log('setChartData', data);
        const generator = new SensorGenerator();
        setInterval(() => {
            const dataGraphs = generator.stubDataChartGenerator(5);

            io.emit('getChartData', {dataGraphs});
        }, interval);
    });

    client.on('setObjectPositionData', (interval, data) => {
        console.log('setObjectPositionData', data);
        const generator = new ScreenplayGenerator();

        if (!this.moveCheck) {
            this.moveX = 50;
            this.moveY = 160;
            this.moveCheck = 0;
            this.rand = 1;
        }

        setInterval(() => {

            const dataObjectPosition = generator.stubScreenplayGenerator(this.moveX, this.moveY, this.moveCheck, this.rand);
            console.log(this.moveX, this.moveY, this.moveCheck, this.rand);
            this.moveX = dataObjectPosition.moveX;
            this.moveY = dataObjectPosition.moveY;
            this.moveCheck = dataObjectPosition.moveCheck;
            this.rand = dataObjectPosition.rand;


            io.emit('getObjectPositionData', {dataObjectPosition});
        }, interval);
    });
});


const portIO = 8010;
io.listen(portIO);

server.listen(port, () => console.log(`server started on port ${port}`));
