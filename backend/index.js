const express = require('express');
const app = express();

// configure the environment variables
const dotenv = require('dotenv');
dotenv.config();

// cors config
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes.js');

// configure the database by just calling the singleton object of Database class
const db = require('./db-config.js');


// use the cors middleware 
app.use(cors({ origin: true, credentials: true }));
console.log("Hello world!!");

// use the body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.all('/', (req, res) => {
    console.log("Request received successfully");
});

app.use('/books', routes);



// listen
const PORT = process.env.PORT || 4000;
app.listen(PORT, (err) => {
    if(err) console.log(`There is an error starting the server at PORT: ${PORT}`);
    else console.log(`Server started successfully at PORT: ${PORT}`);
});
