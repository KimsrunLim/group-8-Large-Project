const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const url = 'mongodb+srv://admin:COP4331@group8large.ndz51wr.mongodb.net/?retryWrites=true&w=majority&appName=group8large';
const MongoClient = require("mongodb").MongoClient;

const client = new MongoClient(url);
client.connect(console.log("mongodb connected"));

app.post('/api', async (req, res, next) => {
    
    const { firstName, lastName, username, password } = req.body;

    const newUser = {FirstName:firstName, LastName:lastName, Username:username, Password:password};
    var error = '';

    try
    {
        const db = client.db("group8large");
        const result = db.collection('users').insertOne(newUser);
    }
    catch(e)
    {
        error = e.toString();
    }

    var ret = { error: error };
    res.status(200).json(ret);
});

app.post('/api/users', async (req, res, next) => {
    var error = '';

    const { username, password } = req.body;

    const db = client.db("group8large");

    const results = await
        db.collection('users').find({ Username : username, Password : password}).toArray();
    
    var id = -1;
    var fn = '';
    var ln = '';
    
    if (results.length > 0) {
        id = results[0]._id;
        fn = results[0].FirstName;
        ln = results[0].LastName;
    }

    var ret = { id:id, firstName:fn, lastName:ln, error: '' };
    res.status(200).json(ret);
});

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

app.listen(5000);