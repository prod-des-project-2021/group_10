
const imageToText = () => { 
    chrome.runtime.sendMessage({type: "notification_start"});
    Tesseract.recognize( 'https://tesseract.projectnaptha.com/img/eng_bw.png', 'eng',
    { logger: m => {
        console.log(m.progress) 
    }}
        ).then(({ data: { text } }) => {  
        chrome.runtime.sendMessage({type: "notification_finish"});
        navigator.clipboard.writeText(text);  
    }) 
};

chrome.runtime.onMessage.addListener((msg, sender, response) => { 
    if (msg.command == "recognize") {
        imageToText();
    }
});