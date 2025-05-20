const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: "Movies API",
        description: "Movies database for cse project 2",
    },
    host: "https://cse-341-project2-nacd.onrender.com",
    schemes: ["http", "https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);