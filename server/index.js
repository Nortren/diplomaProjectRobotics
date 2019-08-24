var http = require('http');

var server = http.createServer(function(req, res) {
   res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
   res.end('Тест '+ req.url);
});

server.listen(3000, '127.0.0.1');
console.log('port 3000');
