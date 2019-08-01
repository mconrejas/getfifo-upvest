// server.js

const express = require('express')
const app = express()
const port = 3080

app.get('/assets', function (req, res) {
    // Extract cursor and pageSize from querystring.
    let cursor = req.query.cursor;
    let pageSize = req.query.size;

    // Lazily import the assets-listing function.
    const { listAssets } = require("./src/commands/listAssets");

    // Log the result to the console.
    return listAssets({ cursor, pageSize }).then(data => { 
        console.log('Request complete.'),
        res.json(data)
    });
})

app.get('/register', function (req, res) {
    // Lazily import user registration function.
    const { registerUser } = require("./src/commands/registerUser");
    
    // Extract args from querystring.
    const username = req.query.username;
    const password = req.query.password 

    // Log the result to the console.
    registerUser({ username, password }).then(data => {
        console.log(`Request complete.`),
        res.json(data)
    });
})

app.get('/getaccesstoken', function (req, res) {
    // Extract args from querystring.
    const username = req.query.username;
    const password = req.query.password

    // Lazily import access token acquisition function.
    const { obtainAccessToken } = require("./src/commands/obtainAccessToken");

    // Log the result to the console.
    obtainAccessToken({ username, password }).then(data => {
        console.log(`Request complete.`),
        res.json(data)
    });
})

app.get('/adduserwallet', function (req, res) {
    // Extract args from querystring.
    const accessToken = req.query.accesstoken;
    const password = req.query.password;
    const assetId = req.query.assetid;

    // Lazily import access token acquisition function.
    const { addWallet } = require("./src/commands/addWallet");

    // Log the result to the console.
    addWallet({ accessToken, password, assetId }).then(data => {
        console.log(`Request complete.`),
        res.json(data)
    });
})

app.get('/listwallets', function (req, res) {
    // Extract args from querystring.
    const accessToken = req.query.accesstoken;

    // Lazily import access token acquisition function.
    const { listWallets } = require("./src/commands/listWallets");

    // Log the result to the console.
    listWallets({ accessToken }).then(data => {
        console.log(`Request complete.`),
        res.json(data)
    });
})

app.get('/getwalletbyid', function (req, res) {
    // Extract args from querystring.
    const accessToken = req.query.accesstoken;
    const id = req.query.id;

    // Lazily import access token acquisition function.
    const { getWalletById } = require("./src/commands/getWalletById");

    // Log the result to the console.
    getWalletById({ accessToken, id }).then(data => {
        console.log(`Request complete.`),
        res.json(data)
    });
})

app.get('/send', function (req, res) {
    // Extract args from querystring.
    const accessToken = req.query.accesstoken;
    const password = req.query.password;
    const assetId = req.query.assetid;
    const amount = req.query.amount;
    const fee = req.query.fee;
    const recipient = req.query.recipient;

    // Lazily import access token acquisition function.
    const { conductTransaction } = require("./src/commands/conductTransaction");

    // Log the result to the console.
    conductTransaction({ accessToken, password, walletId, assetId, amount, fee, recipient }).then(data => {
        console.log(`Request complete.`),
        res.json(data)
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))