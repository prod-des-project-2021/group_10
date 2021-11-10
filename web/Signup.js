import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const config = require('./firebaseConfig.json');
const { v4: uuidv4 } = require('uuid');

const firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    databaseURL: config.databaseURL,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

function register() {
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    full_name = document.getElementById('full_name').value;

    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or password is not valid');
        return;
    }
    if (validate_field(full_name) == false) {
        alert('Please enter a full name');
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then(function() {
        writeUserData(email, full_name);

        alert('User created');
    })
    .catch(function(error) {
        var error_code = error.code;
        var error_message = error.message;

        alert(error_message);
    })
}

function validate_email(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == true) {
        return true;
    } else {
        return false;
    }
}

function validate_password(password) {
    if (password < 6) {
        return false;
    } else {
        return true;
    }
}

function validate_field(field) { 
    if (field == null) {
        return false;
    }

    if (field.length <= 0) {
        return false;
    } else {
        return true;
    }
}

function writeUserData(email, full_name) {
    set(ref(database, 'users/' + uuidv4()), {
        email: email,
        full_name: full_name
    });
}