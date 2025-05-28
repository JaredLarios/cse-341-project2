// express web server
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStartegy = require('passport-github2').Strategy;
const cors = require('cors');
const app = express();

const port = process.env.port || 8080;

app
    .use(bodyParser.json())
    .use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })
    .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
    .use(cors({ origin: '*' }))
    .use("/", require('./routes'))

    .use((err, req, res, next) => {
    res.status(err.status || 500)
        .json({
            error: {
                status: err.status || 500,
                message: err.message
            }
        });
});


passport.use(new GitHubStartegy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    //User.findOrCreate({ githubId: profile.id }, function (err, user) {
        return done(null, profile);
    // });
}
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => {res.send(req.session.user !== undefined ? `Logged as ${req.session.user.displayName}` : `Logged Out`)});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
});


mongodb.initDB((err) => {
    if(err) {
        console.log("DB: "+ err);
    }
    else {
        app.listen(port, 
            () => {console.log(`Database init and server Running on port ${port}`)});
    }
});