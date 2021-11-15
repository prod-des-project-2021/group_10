
const firebaseConfig = {
    apiKey: "AIzaSyAWI_J1Rk7nHGNOWwMkUDQO4j0zx3FjIdQ",
    authDomain: "chrome-7aec3.firebaseapp.com",
    projectId: "chrome-7aec3",
    databaseURL: "https://chrome-7aec3-default-rtdb.europe-west1.firebasedatabase.app",
    storageBucket: "chrome-7aec3.appspot.com",
    messagingSenderId: "193911158991",
    appId: "1:193911158991:web:f463cd5322d9bf6bfe1fba"
}

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var counterForReg = 0;

function register() {
    form_header.innerText = "Please create an account";

    document.getElementById('email').style.display = "block";
    document.getElementById('password').style.display = "block";

    counterForReg++;
    if (counterForReg == 1) { 
        document.getElementById('full_name').style.display = "block";
        return;
    } else if (counterForReg == 0) {
        document.getElementById('full_name').style.display = "none";
        return;
    } else if (counterForReg > 1) {
        counterForReg--;
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

    counterForReg--;
    if (counterForReg == 0) { 
        document.getElementById('full_name').style.display = "none"
        return;
    }
    if (counterForReg < 0) { 
        counterForReg++;
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