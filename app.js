const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const postsRoute = require('./routes/posts');
const bodyParser = require('body-parser');
const cors = require('cors');

//access-control-allow-origin
app.use(cors());

// parse APIs body to json
app.use(bodyParser.json());

// middle layer for router posts
app.use('/posts', postsRoute);

// routes
// http://localhost:9000
app.get('/', (req, res) => {
    res.send(require('./index')());
});
//app.post
//app.delete
//app.patch // update

// middle layer :; which allow us ro execute every time on a commond
// like app.use(authencateIncomeCommands);
/*app.use('/posts', () => {
    console.log("we are execute on every post command.");
});*/
/*
app.get('/posts', (req, res) => {
    res.send('we are on post area');
});
*/// moving to post module..

// DB : mangoos -- online where only data store without relations.
// connect to DB
mongoose.connect(
    process.env.DATABASE_SANDBOX_nspdeveloper_sample1,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('DB Connected!');
    })
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });


// start listing to server
app.listen(9000);


