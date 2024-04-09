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
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const { username, email, password } = req.body;
    const newUser = { Username: username, Email: email.toLowerCase(), Password: password, Validate: false, VerifyCode: verificationCode };

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
    var error = "";

    const { username, password } = req.body;

    try {
        const db = client.db("group8large");

        const results = await
            db.collection('users').find({ Username: username, Password: password }).toArray();

        if (results.length <= 0) {
            error = "No Account Exists";
        }

        if (results.Validate === false) {
            error = "Account Not Validated";
        }
    }
    catch (e) {
        error = e;
    }

    var ret = { error: error };
    res.status(200).json(ret);
});

app.post('/api/email', async (req, res, next) => {
    var error = "";

    const { email } = req.body;

    try {
        const db = client.db("group8large");

        const results = await
            db.collection('users').find({ Email: email.toLowerCase() }).toArray();

        if (results.length <= 0) {
            error = "No Email Found";
        }
    }
    catch (e) {
        error = e;
    }

    var ret = { error: error };
    res.status(200).json(ret);
});

app.post('/api/addReactionData', async (req, res, next) => {

    const { username, time, date, device } = req.body;
    const newData = { Username: username, Time: time, Date: date, Device: device };

    console.log("New Data: ", newData);

    var error = '';

    try {
        const db = client.db("group8large");
        const results = await
            db.collection('ReactionGame').find({ Username: username }).toArray();

        if (results.length > 0) {
            if (time < results[0].Time) {
                const query = { Username: username }
                const result = await db.collection("ReactionGame").deleteOne(query);
                db.collection('ReactionGame').insertOne(newData);
            }
        }
        else {
            const result = db.collection('ReactionGame').insertOne(newData);
        }
    }
    catch (e) {
        error = e;
    }
    var ret = { error: error };
    res.status(200).json(ret);
});

app.post('/api/ReactionLeaderboard', async (req, res, next) => {
    // const { username, accuracy, speed, score, device, date } = req.body;
    var error = '';
    var results;

    try {
        const db = client.db("group8large");
        results = await
            db.collection('ReactionGame').find().sort({ Time: 1 }).toArray();

        // console.log(results);
        // console.log("Number of Scores: ", results.length);

        if (results.length <= 0) {
            error = "No Data";
        }
    }
    catch (e) {
        error = e;
    }

    var ret = { results: results, error: error };
    res.status(200).json(ret);
});

app.post('/api/addTypingData', async (req, res, next) => {

    const { accuracy, date, device, score, speed, username } = req.body;
    const newData = { Accuracy: accuracy, Date: date, Device: device, Score: score, Speed: speed, Username: username };

    var error = '';

    try {
        const db = client.db("group8large");
        const results = await
            db.collection('TypingGame').find({ Username: username }).toArray();

        if (results.length > 0) {
            if (score > results[0].Score) {
                const query = { Username: username }
                const result = await db.collection("TypingGame").deleteOne(query);
                db.collection('TypingGame').insertOne(newData);
            }
        }
        else {
            const db = client.db("group8large");
            const result = db.collection('TypingGame').insertOne(newData);
        }
    }
    catch (e) {
        error = e;
    }

    var ret = { error: error };
    res.status(200).json(ret);
});

app.post('/api/TypingLeaderboard', async (req, res, next) => {
    // const { username, accuracy, speed, score, device, date } = req.body;
    var error = '';
    var results;

    try {
        const db = client.db("group8large");
        results = await
            db.collection('TypingGame').find().sort({ Score: -1 }).toArray();

        // console.log(results);
        // console.log("Number of Scores: ", results.length);

        if (results.length <= 0) {
            error = "No Data";
        }
    }
    catch (e) {
        error = e;
    }

    var ret = { results: results, error: error };
    res.status(200).json(ret);
});

app.post('/api/userTypingData', async (req, res, next) => {
    const { username } = req.body;
    var error = '';
    var results;

    try {
        const db = client.db("group8large");
        const results = await
            db.collection('TypingGame').find({ Username: username }).toArray();


        // console.log(results);
        // console.log("Number of Scores: ", results.length);

        if (results.length <= 0) {
            error = "No User Exists";
        }

        var userScore = results[0].Score;
    }
    catch (e) {
        error = e;
    }

    var ret = { userScore: userScore, error: error };
    res.status(200).json(ret);
});

app.post('/api/userReactionData', async (req, res, next) => {
    const { username } = req.body;
    var error = '';

    try {
        const db = client.db("group8large");
        const results = await
            db.collection('ReactionGame').find({ Username: username }).toArray();


        // console.log(results);
        // console.log("Number of Scores: ", results.length);

        if (results.length <= 0) {
            error = "No User Exists";
        }

        var userTime = results[0].Time;
    }
    catch (e) {
        error = e;
    }

    var ret = { userTime: userTime, error: error };
    res.status(200).json(ret);
});

// Email Verification Start
const nodemailer = require('nodemailer');
const uuid = require('uuid');

// POST route to send email
app.post('/send-email', async (req, res) => {
    const { emailR, username } = req.body;
    var message = '';


    if (username === null && emailR) {
        // Reset Password
        const db = client.db("group8large");
        const results = await
            db.collection('users').findOne({ emailR }).toArray();

        message = `Hello,\n\nPlease input the code to your password:\t\tlocalhost:5001/verify-email?token=${verificationToken}`;
    }
    else if (emailR && username) {
        // Get this verification code in your database along with the user's emailR
        const db = client.db("group8large");
        const results = await
            db.collection('users').findOne({ Username: username, Email: emailR });


        const newLink = `https://group8large-57cfa8808431.herokuapp.com/verify-email?token=${emailR}`
        message = `Welcome to GameOn!\n\nClick the link to verify your account : ${newLink}`;
    }
    else {
        console.log("error getting username or email");
        res.status(500).send('Error sending email');
    }

    // Create a nodemailer transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Use Gmail as the email service
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "cop4331gameon008@gmail.com", // Your Gmail email address
            pass: "vtpq muwx fomn njcv", // Your Gmail password (consider using app-specific password)
        },
    });

    // Define email options
    let mailOptions = {
        from: 'cop4331gameon008@gmail.com', // Sender email address
        to: emailR, // Recipient email address
        subject: 'GameOn Email Verification', // Email subject
        text: message, // Plain text body
    };


    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully');
        }
    });

});

// app.post('/verify', async (req, res) => {
//     const { email, code } = req.body;
//     var error = '';

//     const db = client.db("group8large");
//     const results = await
//         db.collection('users').findOne({ Email: email });

//     if (results.VerifyCode)
//     {
//         console.log("Verificaion Code: ", results.ver)
//     }

//     console.log("Email: ", email, "\t Code: ", code);

//     var ret = { error: error };
//     res.status(200).json(ret);
// });

// Endpoint to handle verification
app.get('/verify-email', async (req, res) => {
    const token = req.query.token;

    res.status(200).send('Checkpoint 1');

    // Look up the user in the database using the token
    const db = client.db("group8large");
    const user = await db.collection('users').find({ Email: token }).toArray();

    res.status(200).send('Checkpoint 2');

    if (!user) {
        return res.status(400).send('Invalid verification token');
    }

    res.status(200).send('Checkpoint 3');

    const filter = { Email: token };
    await db.collection('users').updateOne(filter, { $set: { Validate: true } });

    res.status(200).send('Checkpoint 4');

    res.redirect('https://group8large-57cfa8808431.herokuapp.com/login'); // Redirect the user to login page or wherever you want

    res.status(200).send('Checkpoint 5');
});
// Email Verification End

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