// server.js

const express = require('express')
const app = express()
const port = 3080

app.get('/api/listassets', function (req, res) {
    // Extract cursor and pageSize from querystring.
    let cursor = req.query.cursor;
    let page_size = req.query.page_size;

    // Lazily import the assets-listing function.
    const { listAssets } = require("./src/commands/listAssets");

    // Log the result to the console.
    return listAssets({ cursor, page_size }).then(data => { 
        console.log('URL: /assets'),
        res.json(data)
    });
})

app.get('/api/getasset', function (req, res) {
    // Extract args from querystring.
    const assetId = req.query.asset_id;

    // Lazily import access token acquisition function.
    const { getAsset } = require("./src/commands/getAsset");

    // Log the result to the console.
    getAsset({ assetId }).then(data => {
        console.log(`URL: /getasset`),
            res.json(data)
    });
})

app.post('/api/register', function (req, res) {
    // Lazily import user registration function.
    const { registerUser } = require("./src/commands/registerUser");
    
    // Extract args from querystring.
    const username = req.query.username;
    const password = req.query.password;

    // Log the result to the console.
    registerUser({ username, password }).then(data => {
        console.log(`URL: /register\n\rDATA: ['username':${username}, 'password':${password}]`),
        console.log(data),
        res.json(data)
    });
})

app.post('/api/unregister', function (req, res) {
    // Lazily import user registration function.
    const { deregisterUser } = require("./src/commands/deregisterUser");

    // Extract args from querystring.
    const username = req.query.username;

    // Log the result to the console.
    deregisterUser({ username }).then(data => {
        console.log(`URL: /register\n\rDATA: ['username':${username}]`),
        console.log(data),
        res.json(data)
    });
})

app.post('/api/')

app.post('/api/getaccesstoken', function (req, res) {
    // Extract args from querystring.
    const username = req.query.username;
    const password = req.query.password

    // Lazily import access token acquisition function.
    const { obtainAccessToken } = require("./src/commands/obtainAccessToken");

    // Log the result to the console.
    obtainAccessToken({ username, password }).then(data => {
        console.log(`URL: /getaccesstoken`),
        res.json(data)
    });
})

app.post('/api/adduserwallet', function (req, res) {
    // Extract args from querystring.
    const accessToken = req.query.accesstoken;
    const password = req.query.password;
    const assetId = req.query.asset_id;

    // Lazily import access token acquisition function.
    const { addWallet } = require("./src/commands/addWallet");

    // Log the result to the console.
    addWallet({ accessToken, password, assetId }).then(data => {
        console.log(`URL: /adduserwallet`),
        res.json(data)
    });
})

app.get('/api/listwallets', function (req, res) {
    // Extract args from querystring.
    const accessToken = req.query.accesstoken;

    // Lazily import access token acquisition function.
    const { listWallets } = require("./src/commands/listWallets");

    // Log the result to the console.
    listWallets({ accessToken }).then(data => {
        console.log(`URL: /listwallets`),
        res.json(data)
    });
})

app.get('/api/getwallet', function (req, res) {
    // Extract args from querystring.
    const accessToken = req.query.accesstoken;
    const assetId = req.query.assetid;

    // Lazily import access token acquisition function.
    const { getWallet } = require("./src/commands/getWallet");

    // Log the result to the console.
    getWallet({ accessToken, assetId }).then(data => {
        console.log(`URL: /getwallet`),
            console.log(data),
        res.json(data)
    });
})

app.post('/api/transact', function (req, res) {
    // Lazily import the wallet adding function.
    const { conductTransaction } = require("./src/commands/conductTransaction");
    
    // Extract args from querystring.
    const accessToken = req.query.access_token;
    const password = req.query.password;
    const walletId = req.query.wallet_id;
    const assetId = req.query.asset_id;
    const amount = req.query.amount;
    const fee = req.query.fee;
    const recipient = req.query.address;
    
    // Log the result to the console.
    conductTransaction({
        accessToken,
        password,
        walletId,
        assetId,
        amount,
        fee,
        recipient }).then(data => {
        console.log(`URL: /send`),
        console.log(data),
        res.json(data)
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))