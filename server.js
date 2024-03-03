const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const url = 'mongodb+srv://admin:COP4331@group8large.ndz51wr.mongodb.net/?retryWrites=true&w=majority&appName=group8large';
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(url);
client.connect(consol.log("mongodb connected"));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});