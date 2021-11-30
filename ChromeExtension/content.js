const imageToText = (url) => { 
    chrome.runtime.sendMessage({command: "notification_start"});
    Tesseract.recognize( url, 'eng',
    { logger: m => {
        console.log(m.progress) 
    }}
        ).then(({ data: { text } }) => {  
        chrome.runtime.sendMessage({command: "notification_finish"});
        navigator.clipboard.writeText(text);  
    });
};

chrome.runtime.onMessage.addListener((msg, sender, response) => { 
    console.log(msg)
    if (msg.command == "recognize") {
        imageToText(msg.src);
    };

    if (msg.command == "crop") { 
        let cropping = true
        let mouseCoordinates = {
            mousedownX : 0,
            mousedownY : 0,
            mouseupX : 0,
            mouseupY : 0
        };
         
        document.body.onmousedown = (e) => {
            if (cropping) {
                mouseCoordinates.mousedownX = e.clientX;
                mouseCoordinates.mousedownY = e.clientY;
                console.log("mouse down");
                console.log(e);
            }
        };

        document.body.onmouseup = (e) => {
            if (cropping) {
                mouseCoordinates.mouseupX = e.clientX;
                mouseCoordinates.mouseupY = e.clientY; 
                console.log("mouse up");
                console.log(e);
                console.log(mouseCoordinates);
                chrome.runtime.sendMessage({command:"mousecoordinates", mouseCoordinates});
                cropping = false;
            };
        };
    };
});



 

        