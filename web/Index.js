const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const formidable = require('express-formidable')
const path = require('path');
var fs = require('fs');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const fileupload = require('express-fileupload');
const firebase = require('firebase');


const app = express();

var testing = false;
var loggedIn = "no";

app.use(cookieParser());
app.use(bodyParser.json());
app.use(formidable());
app.use(fileupload({
    useTempFiles: true
}))

app.set('port', (process.env.PORT || 80));

const options = {

    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWTKEY
};



passport.use(new BasicStrategy(
    (username, password, done) => {
        const searchResult = users.find(user => {
           if(user.username = username)  {
               console.log("username true")
               if(bcrypt.compareSync(password, user.password)) {
                   console.log("password true")
                   loggedIn = username;
                   return true;
               }
           }
           return false;
        })
        if(searchResult != undefined) {
            done(null, searchResult);
        } else {
            done(null,false);
        }
    }
))

function startsWithCapital(word) {
    return word.charAt(0) === word.charAt(0).toUpperCase();
}

// custom passport method for authentication when logged in or signed up
function generateAccessToken(username) {
    return jwt.sign(username, process.env.JWTKEY);
}

// custom-built passport for JWT, you can insert the token either in
// the bearer token in Postman or it can look it up from cookies as 
// it is stored during login or signup there.
function authenticateToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if ( typeof bearerHeader !== 'undefined') { 
        const bearerToken = bearerHeader.split(' ')[1]
        console.log(bearerToken);
        jwt.verify(bearerToken, process.env.JWTKEY, (err, user) => {
            if(err) {
                res.sendStatus(403)
            } else {
                req.user = user
                next();
            }
        })
    } else {
        let cookie = req.cookies['tokenKey'];
        if(cookie == 'undefined') {
            res.sendStatus(403);
        } else {
            jwt.verify(cookie, process.env.JWTKEY, (err, user) => {
                if(err) {
                    res.sendStatus(403)
                } else {
                    req.user = user
                    next();
                }
            })
        }
    }
}

// for serverTests
function setToTesting() {
    testing = true;
}

function generateUser(req) {
    const saltNumber = Math.floor(Math.random() * 6) + 1;
    const salt = bcrypt.genSaltSync(saltNumber);
    var userid,password, username, email,streetaddress,postalcode,city;
    console.log(req.fields.username);
    if(testing) {
        username = "joonas";
        password = "moro";
        email = "joonas@gmail.com";
        streetaddress = "esimerkkitie 56",
        postalcode = "90123"
        city = "Oulu"
    } else {
        username = req.fields.username
        password = req.fields.password;
        email = req.fields.email;
        streetaddress = req.fields.streetaddress;
        postalcode = req.fields.postalcode;
        city = req.fields.city;
    }

// use bcrypt to create a secure password and store it in local db
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = {
        userid: uuidv4(),
        username: username,
        password: hashedPassword,
        email: email,
        streetaddress: streetaddress,
        postalcode: postalcode,
        city: city
    }

    return newUser;
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/Index.html'));
  })

app.post('/signup', (req, res) => {

    //check if empty data is present
    if(req.fields.username == undefined || req.fields.password == undefined || req.fields.email == undefined) {
        res.status(400).send('Please enter your information');
    }

    // check for existing users
    const searchResult = users.find(user => {
        if(user.username == req.fields.username)  {
            console.log("username in use");
            res.status(400).send('Username in use');
        } else if(user.email == req.fields.email) {
            console.log("email in use");
            res.status(400).send('Email in use');
            return false;
        }
    })

    newUser = generateUser(req);

    //generate JWT token
    const token = generateAccessToken( {username: newUser.username })

    users.push(newUser)
    res.cookie('tokenKey', token);
    res.json({token: token});
    res.sendStatus(201)
})

// not in use
/* app.get('/users', authenticateToken, (req, res) => {
    res.json(users)
}); */

// login and signup is done via http-basic, but after logging in,
// the process of scrolling through pages and checking authorization
// is done via JWT
app.post('/login', passport.authenticate('basic', { session: false }), (req, res) => {
    const token = generateAccessToken(loggedIn);
    loggedIn = "no";
    console.log(req.fields.username);
    res.cookie('tokenKey', token);
    res.json(token);
    res.sendStatus(201);
})


let serverInstance = null;

module.exports = {
    start: function() { 
        serverInstance = app.listen(app.get('port'), () => { 
            
        })
    },
    close: function() { 
        serverInstance.close();
    },
    generateUser,
    generateItem,
    items,
    setToTesting,
    startsWithCapital
}