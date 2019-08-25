var express = require('express');
var app = express();
const render = require('../src/index.html');
app.use('./src/', express.static('src'));

// Отслеживания ссылки урла и соотвественно иобработка
app.get('/', function(req, res) {
    res.render(render);
});

app.listen(3000,()=> console.log('server started'));
