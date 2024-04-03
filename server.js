require('dotenv').config();
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');
const PORT = process.env.PORT || 5001;

const app = express();

app.set('port', (process.env.PORT || 5001));

app.use(cors());
app.use(bodyParser.json());

///////////////////////////////////////////////////
// For Heroku deployment
// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('gameon-frontend-web/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'gameon-frontend-web', 'build', 'index.html'));
    });
}

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
client.connect();

// signup
app.post('/api/signup', async (req, res, next) => {

    const { username, email, password } = req.body;
    const newUser = { Username: username, Email: email, Password: password };

    var error = '';

    try {
        const db = client.db("group8large");
        const results = await
            db.collection('users').find({ Username: username }).toArray();

        if (results.length == 0) {
            const db = client.db("group8large");
            const result = db.collection('users').insertOne(newUser);
        }
        else {
            error = "User already exists";
        }
    }
    catch (e) {
        error = e;
    }

    var ret = { error: error };
    res.status(200).json(ret);
});

// check for existing user
app.post('/api/userCheck', async (req, res, next) => {

    const { username } = req.body;
    var error = '';

    try {
        const db = client.db("group8large");
        const results = await
            db.collection('users').find({ Username: username }).toArray();

        if (results.length == 0) {
            const db = client.db("group8large");
        }
        else {
            error = "User already exists";
        }
    }
    catch (e) {
        error = e;
    }

    var ret = { error: error };
    res.status(200).json(ret);
});

// login
app.post('/api/users', async (req, res, next) => {
    var error = '';

    const { username, password } = req.body;

    try {
        const db = client.db("group8large");

        const results = await
            db.collection('users').find({ Username: username, Password: password }).toArray();

        var id = -1;
        var fn = '';
        var ln = '';

        if (results.length > 0) {
            id = results[0]._id;
            fn = results[0].FirstName;
            ln = results[0].LastName;
        }
    }
    catch (e) {
        error = e;
    }

    var ret = { id: id, firstName: fn, lastName: ln, error: '' };
    res.status(200).json(ret);
});

app.post('/api/leaderboard', async (req, res, next) => {
    // const { username, accuracy, speed, score, device, date } = req.body;
    var error = '';
    var results;

    try {
        const db = client.db("group8large");
        results = await
            db.collection('TypingGame').find().sort({Score: -1}).toArray();

        // console.log(results);
        // console.log("Number of Scores: ", results.length);

        if (results.length <= 0)
        {
            error = "No Data";
        }
    }
    catch (e) {
        error = e;
    }

    var ret = { results: results, error: error };
    res.status(200).json(ret);
});

app.post('/api/userData', async (req, res, next) => {
    const { username } = req.body;
    var error = '';

    try {
        const db = client.db("group8large");
        const results = await
            db.collection('TypingGame').find({ Username: username }).sort({ Score: -1 }).toArray();


        // console.log(results);
        // console.log("Number of Scores: ", results.length);

        if (results.length <= 0)
        {
            error = "No User Exists";
        }
    }
    catch (e) {
        error = e;
    }

    var ret = { error: error };
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

app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});