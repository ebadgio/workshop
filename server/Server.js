const express = require('express');
const session = require('express-session');
const compress = require('compression');
const path = require('path');
const bodyParser = require('body-parser');

// Env variables
const connect = process.env.MONGODB_URI;
const secret = process.env.SECRET;

// Note: if you host using heroku, you might find this useful
// const sslRedirect = require('heroku-ssl-redirect');

// MongoDB
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
mongoose.connect(connect);
mongoose.Promise = global.Promise;

// Mongoose models
const User = require('./models/User');

// Create instance of express server
const app = express();

// Again, for if you use Heroku: enable ssl redirect
// app.use(sslRedirect());

const buildPath = path.join(__dirname, '..', 'build');

app.use(express.static(buildPath));
app.use(compress());

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));

// Create session
app.use(session({
    secret: secret,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Passport
const passport = require('passport');
const LocalStrategy = require('passport-local');

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, done);
});

// passport strategy
passport.use(new LocalStrategy((username, password, done) => {
        // Find the user with the given username
        User.findOne({ username: username }, (err, user) => {
            // if there's an error, finish trying to authenticate (auth failed)
            if (err) {
                console.error('Error fetching user in LocalStrategy', err);
                return done(err);
            }
            // if no user present, auth failed
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            // if passwords do not match, auth failed
            if (user.password !== password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            // auth has has succeeded
            return done(null, user);
        });
    }
));


// app.use('/db', db);

// frontend entry
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build/index.html'));
});



// Handles unknown routes
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    console.log(err);
    res.send('404: Page Not Found');
    next(err);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});