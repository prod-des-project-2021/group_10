const image = document.getElementById('imageid')
const saveButton = document.getElementById('saveButton')
const loggingButton = document.getElementById('loggingButton')
const inputEmail = document.getElementById('inputEmail')
const inputPassword = document.getElementById('inputPassword')
const statusDot = document.getElementById('topdot')
const savebuttonOFF = "#D6D6D6"
const savebuttonON = "#9dbcfa"
const savebuttonON_HOVER = "#5c8cec"
let user = null;

const firebaseConfig = {
    // apiKey: XXXXXXXXXX
    // authDomain: XXXXXXXXXXXXXX
    // databaseURL: XXXXXXXXXX
    // projectId: XXXXXXXX
    // storageBucket: XXXXXXXXX
    // messagingSenderId: XXXXXXXXXXX
    // appId: XXXXXXXXXXXXXXXXXXXXX
};

const fb = firebase.initializeApp(firebaseConfig)
const storageRef = fb.storage().ref();

const updateUser = () => {
    chrome.runtime.sendMessage({command:"getUser"}, (response)=> {
        user = response
        if(user !== null) { 
            loggingButton.textContent = "Logout";
            statusDot.style.backgroundColor = "#39e02d"
            inputEmail.style.display = "none"
            inputPassword.style.display = "none"
            saveButton.textContent = "Save Image"
            saveButton.disabled = false;
            saveButton.style.backgroundColor = savebuttonON;
            saveButton.style.opacity = 0.6
            saveButton.addEventListener("mouseover", ()=> {
                saveButton.style.backgroundColor = savebuttonON_HOVER;
            })
            saveButton.addEventListener("mouseout", ()=> {
                saveButton.style.backgroundColor = savebuttonON;
            })
        } else {
            loggingButton.textContent = "Login";
            statusDot.style.backgroundColor = "#f20505"
            inputEmail.style.display = "block"
            inputPassword.style.display = "block"
            saveButton.disabled = true;
            saveButton.textContent = "Save Image"
            saveButton.style.backgroundColor = savebuttonOFF;
            saveButton.style.opacity = 0.6
        }
    })
}
updateUser()

loggingButton.addEventListener("click", () => {
    if (user !== null) {
        chrome.runtime.sendMessage({command: "setUser", user: null})
        updateUser()
    } 
    else {
        fb.auth().signInWithEmailAndPassword(inputEmail.value, inputPassword.value)
        .then((userCreds) => {
            user = userCreds.user
            inputEmail.value=""
            inputPassword.value=""
            chrome.runtime.sendMessage({command: "setUser", user: user})
            updateUser()
        })
    }
})

//FIREBASEN OMAA FIREBASEN OMAA FIREBASEN OMAA FIREBASEN OMAA FIREBASEN OMAA
chrome.runtime.onMessage.addListener((request, sender, response) => { 
    if (request.command == "saveimage") {
        image.src = request.src
        image.onload = () => {
            let buttonPadding = ((image.height/2)) + "px " + ((image.width/2)) + "px";
            saveButton.style.padding = buttonPadding;
            if (image.width > window.innerWidth) {
                window.resizeTo(image.width + 100, window.innerHeight + 50)
            } else if (image.height > window.innerHeight) {
                window.resizeTo(window.innerWidth, image.height + 150)
            }
        }
    }
});

saveButton.addEventListener("click", ()=> {
    if(user !== null) {
        const filename = Date.now() + ".jpg"
        const imageRef = storageRef.child(user.uid + "/" + filename);
        const dbRef = fb.firestore().collection(user.uid);
        const dataurl = image.src;
        const createdAt = firebase.firestore.FieldValue.serverTimestamp()

        imageRef.putString(dataurl, "data_url").then(()=>{ 
            imageRef.getDownloadURL().then((url)=> {
                dbRef.add({url, createdAt})
                saveButton.disabled = true;
                saveButton.style.backgroundColor = savebuttonOFF;
                saveButton.textContent = "Image Saved"
            }) 
        })
    }
})




