const NOTIFICATION_ONE = 'notificationOne'
const NOTIFICATION_TWO = 'notificationTwo'
let user = null

chrome.runtime.onMessage.addListener((request, sender, response) => { 
    if (request.command == "notification_start") {
        chrome.notifications.create(NOTIFICATION_ONE, {
            type: "basic",
            title: "PDIProject",
            message: "Translating image...",
            iconUrl: "./icons/icon64.png"
        })  
    }; 

    if (request.command == "notification_finish" ) {  
        chrome.notifications.clear(NOTIFICATION_ONE); 
        chrome.notifications.create(NOTIFICATION_TWO, {
            type: "basic",
            title: "PDIProject",
            message: "Text copied to clipboard",
            iconUrl: "./icons/icon64.png"
        })
        if (request.createWindow === true) {
            chrome.windows.create({ url: "firebase.html", type: "popup",
                width: 500, height: 300, top: 250, left: 710, focused: false})
            setTimeout(() => {
                chrome.runtime.sendMessage({command: "saveimage", src: request.url, user: user}) 
            }, 250) 
        }
        setTimeout(() => {
            chrome.notifications.clear(NOTIFICATION_TWO);
        }, 4000);   
    }

    if (request.command == "getUser") { 
        response(user)
    }
    if (request.command == "setUser") {
        user = request.user
    }
});