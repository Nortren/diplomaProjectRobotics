const express = require('express');
const io = require('socket.io')();
const http = require('http');
const port = process.env.Port || 3000;


const app = express();
const server = http.createServer(app);


import Generator from '../server/DataGenerator/Generator';

// const io = socketIO.listen(server);

io.on('connection', (client) => {
    client.on('setGraphsData', (interval, data) => {
        console.log('setGraphsDataEvent', data);
        const generator = new Generator();
        setInterval(() => {
            const dataGraphs = generator.stubDataGraphsGenerator(4);
            io.emit('getGraphsData', { dataGraphs});
        }, interval);
    });


});


const portIO = 8010;
io.listen(portIO);
console.log('listening on port ', portIO);

app.get('/api/customers', (req, res) => {
    const customers =
        {id: 14566565, firstName: 'Alex', lastName: 'Test'};
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.json(customers);
});

app.get('/', (req, res) => {
    const qs = require('querystring');
    const imageData = '';
    const myId = 1;

    /* Запуск сервера */
    if (req.method == 'POST') {
        let fullBody = '';
        req.on('data', function (chunk) {
            fullBody += chunk.toString();
        });
        req.on('end', function () {
            res.writeHead(200, {'Content-Type': 'text/html'});
            const POST = qs.parse(fullBody);
            if (POST.p == 'new') { // Смена изображения
                imageData = POST.text;
                myId += 1;
                res.write(imageData);
            } else if (POST.p == 'ajax') {
                if (myId > parseInt(POST.last)) {
                    if (typeof (imageData) !== 'undefined') {
                        // res.write(document.body.innerHTML = ('<img src=" + '"' + imageData + '"' + "/>');" + "\n");
                        res.write('last_message_id = ' + myId + ';');
                    }
                }
            }
            res.end();
        });
    } else { /* Здесь идёт отдача всего, что пользователь просит. */
    }
});

server.listen(port, () => console.log(`server started on port ${port}`));
