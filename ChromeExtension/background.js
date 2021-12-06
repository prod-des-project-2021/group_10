const NOTIFICATION_ONE = 'notificationOne'
const NOTIFICATION_TWO = 'notificationTwo'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => { 
    console.log(request)
    
    if (request.command == "notification_start") {
        console.log("in notification_start") 
        chrome.notifications.create(NOTIFICATION_ONE, {
            type: "basic",
            title: "PDIProject",
            message: "Translating text...",
            iconUrl: "./icons/icon64.png"
        })  
    }; 

    if (request.command == "notification_finish") { 
        chrome.notifications.clear(NOTIFICATION_ONE); 
        console.log("notification_finish")  
        chrome.notifications.create(NOTIFICATION_TWO, {
            type: "basic",
            title: "PDIProject",
            message: "Text copied to clipboard",
            iconUrl: "./icons/icon64.png"
        })  
        setTimeout(() => {
            chrome.notifications.clear(NOTIFICATION_TWO);
            console.log("noti cleared") 
        }, 4000); 
    };
});