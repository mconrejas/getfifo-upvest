// server.js

const express = require('express')
const app = express()
const port = 3000

app.get('/assets', function (req, res) {
    // Lazily import the assets-listing function.
    const { listAssets } = require("./src/commands/listAssets");

    // Extract cursor and pageSize from querystring.
    let cursor = req.query.cursor;
    let pageSize = req.query.size;

    // Log the result to the console.
    return listAssets({ cursor, pageSize }).then(data => { 
        console.log('Request complete.'),
        res.json(data)
    });
})

app.get('/register', function (req, res) {
    // Lazily import user registration function.
    const { registerUser } = require("./src/commands/registerUser");
    
    // Extract username and password from querystring.
    const username = req.query.username;
    const password = req.query.password 

    // Log the result to the console.
    registerUser({ username, password }).then(data => {
        console.log(`Request complete. Please save this recoverykit in the database: ${data.recoverykit}`),
        res.json(data)
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))