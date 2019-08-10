const express = require("express");
const app = express();
console.log(__dirname,'12312');

app.use(express.static('client'));
app.listen(3000);