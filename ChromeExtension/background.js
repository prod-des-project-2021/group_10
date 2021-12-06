const NOTIFICATION_ONE = 'notificationOne'
const NOTIFICATION_TWO = 'notificationTwo'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => { 
    console.log(request)
    
    if (request.command == "notification_start") {
        chrome.notifications.create(NOTIFICATION_ONE, {
            type: "basic",
            title: "PDIProject",
            message: "Translating image...",
            iconUrl: "./icons/icon64.png"
        })  
    }; 

    if (request.command == "notification_finish") { 
        chrome.notifications.clear(NOTIFICATION_ONE); 
        chrome.notifications.create(NOTIFICATION_TWO, {
            type: "basic",
            title: "PDIProject",
            message: "Text copied to clipboard",
            iconUrl: "./icons/icon64.png"
        })  
        setTimeout(() => {
            chrome.notifications.clear(NOTIFICATION_TWO);
        }, 4000); 
    };

    if (request.command == "create") { 
        chrome.windows.create({ url: "saveimage.html", type: "popup", width: 500, height: 400, focused: false})
        setTimeout(() => {
            chrome.runtime.sendMessage({command: "saveimage", src: request.src}) 
        }, 200)
    }
});