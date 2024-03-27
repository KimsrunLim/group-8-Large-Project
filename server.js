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
app.post('/api', async (req, res, next) => {

    const { firstName, lastName, username, password } = req.body;

    const newUser = { FirstName: firstName, LastName: lastName, Username: username, Password: password };
    var error = '';

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

    var ret = { error: error };
    res.status(200).json(ret);
});

// login
app.post('/api/users', async (req, res, next) => {
    var error = '';

    const { username, password } = req.body;

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

    var ret = { id: id, firstName: fn, lastName: ln, error: '' };
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