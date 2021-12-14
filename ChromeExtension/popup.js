document.addEventListener('DOMContentLoaded', function() {
    const openButton = document.getElementById('openButton');
    const cropButton = document.getElementById('cropButton');   

    const loggingButton = document.getElementById('loggingButton')
    const inputEmail = document.getElementById('inputEmail')
    const inputPassword = document.getElementById('inputPassword')
    const statusDot = document.getElementById('topdot')
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
    const updateUser = () => {
        chrome.runtime.sendMessage({command:"getUser"}, (response)=> {
            user = response
            if(user !== null) { 
                loggingButton.textContent = "Logout";
                statusDot.style.backgroundColor = "#39e02d"
                inputEmail.style.display = "none"
                inputPassword.style.display = "none"
            } else {
                loggingButton.textContent = "Login";
                statusDot.style.backgroundColor = "#f20505"
                inputEmail.style.display = "block"
                inputPassword.style.display = "block"
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

    //POPUPIN OMAA POPUPIN OMAA POPUPIN OMAA POPUPIN OMAA POPUPIN OMAA
    cropButton.addEventListener('click', function() { 
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
            let activeTab = tabs[0]; 
            chrome.tabs.captureVisibleTab(null, {}, function(dataUrl) { 
                chrome.tabs.sendMessage(activeTab.id, {command: "crop", url: dataUrl})
            }) 
        })
    })
    openButton.addEventListener('click', function() { 
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
            let activeTab = tabs[0]; 
            chrome.tabs.sendMessage(activeTab.id, {command: "test"})
            chrome.windows.create({ url: "https://chrome-app-project.herokuapp.com/", focused: true})
        })
    });
 });

