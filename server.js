// express web server
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();

const port = process.env.port || 8080;

app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

app.use("/", require('./routes'));

app.use((err, req, res, next) => {
    res.status(err.status || 500)
        .json({
            error: {
                status: err.status || 500,
                message: err.message
            }
        });
})


mongodb.initDB((err) => {
    if(err) {
        console.log("DB: "+ err);
    }
    else {
        app.listen(port, 
            () => {console.log(`Database init and server Running on port ${port}`)});
    }
});