// express web server
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();
const server = require("http").createServer(app);

const port = process.env.port || 8080;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

app.use("/", require('./routes'));

mongodb.initDB((err) => {
    if(err) {
        console.log(err);
    }
    else {
        app.listen(port, 
            () => {console.log(`Database init and server Running on port ${port}`)});
    }
});