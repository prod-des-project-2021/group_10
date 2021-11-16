
const firebaseConfig = {
    apiKey: process.env.WEB_FIRE_API_KEY,
    authDomain: process.env.WEB_FIRE_AUTH_DOMAIN,
    projectId: process.env.WEB_FIRE_PROJECT_ID,
    databaseURL: process.env.WEB_FIRE_DATABASE_URL,
    storageBucket: process.env.WEB_FIRE_STORAGE_BUCKET,
    messagingSenderId: process.env.WEB_FIRE_MESSAGING_SENDER_ID,
    appId: process.env.WEB_FIRE_APP_ID
}

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var logPress = false;

function register() {
    form_header.innerText = "Please create an account";

    document.getElementById('email').style.display = "block";
    document.getElementById('password').style.display = "block";

    if(document.getElementById('full_name').style.display == "none")
    {
        document.getElementById('full_name').style.display = "block";
        return;
    }

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

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((success) => {
        var user = firebase.auth().currentUser;
        var uid;

        if (user != null) {
            uid = user.uid;
        }

        var firebaseRef = firebase.database().ref();
        var userData = {
            full_name: full_name,
            email: email
        }

        firebaseRef.child(uid).set(userData);
        alert("Account created");
    })
    .catch(function(error) {
        var error_code = error.code;
        var error_message = error.message;

        alert(error_message);
    })
}

function login() {
    form_header.innerText = "Please login";

    document.getElementById('email').style.display = "block";
    document.getElementById('password').style.display = "block";

    if(document.getElementById('full_name').style.display == "block" || !logPress) {
        document.getElementById('full_name').style.display = "none";
        logPress = true;
        return;
    }

    email = document.getElementById('email').value;
    password = document.getElementById('password').value;

    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or password is not valid');
        return;
    }
    
    firebase.auth().signInWithEmailAndPassword(email, password).then((success) => {
        alert("Logged in successfully");
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