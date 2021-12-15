const imageToText = (url) => { 
    chrome.runtime.sendMessage({command: "notification_start"});
    Tesseract.recognize( url, 'eng',
        ).then(({ data: { text } }) => {  
        chrome.runtime.sendMessage({command: "notification_finish", url: url, createWindow: true});
        navigator.clipboard.writeText(text);  
    });
};

const disableScrolling = () => {
    let x = window.scrollX;
    let y = window.scrollY;
    window.onscroll = () => {
        window.scrollTo(x, y)
    }
}

const enableScrolling = () => {
    window.onscroll = () => {}   
}

const resizePixelRatio = (val) => { 
    let result = Math.round(val * window.devicePixelRatio)
    return result
}

const afterDOMLoaded = () => {
    try {
        let test = document.querySelector(".w-100").childNodes
        const waitChildNodes = () => {
            if (test.length == 0) {
                setTimeout(() => {
                    waitChildNodes()
                }, 100);
            } else {
                let test2 = test[2].childNodes
                const waitChildNodesAgain = () => {
                    if (test2.length == 0) {
                        setTimeout(() => {
                            waitChildNodesAgain()
                        }, 100);
                    } else {
                        for (let ele of test2) {
                            ele.onclick = () => {
                                chrome.runtime.sendMessage({command: "notification_start"});
                                Tesseract.recognize( ele.childNodes[0].src, 'eng',
                                    ).then(({ data: { text } }) => {  
                                    chrome.runtime.sendMessage({command: "notification_finish", createWindow: false});
                                    navigator.clipboard.writeText(text);  
                                });
                            }
                        }
                    }
                }
                waitChildNodesAgain()
            }
        }
        waitChildNodes()
    } catch {
        return
    }
}

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoading", afterDOMLoaded)
} else {
    afterDOMLoaded();
}

chrome.runtime.onMessage.addListener((request, sender, response) => { 
    if (request.command == "crop") { 
        let cropping = true;
        disableScrolling();

        let canvas = document.createElement("canvas");
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight;
        canvas.style.position="absolute";
        canvas.style.left=0;
        canvas.style.top=0;
        canvas.style.zIndex=100000;
        canvas.style.pointerEvents="none";

        let ctx = canvas.getContext("2d") 
        document.body.appendChild(canvas)

        let mouseCoordinates = {
            mousedownX : 0,
            mousedownY : 0,
            mouseupX : 0,
            mouseupY : 0
        };

        document.body.onmousedown = (e) => {
            if (cropping){
                //ctx.rect(100, 150, 200, 150)
                //ctx.fillStyle ='yellow'
                //ctx.fill();
                mouseCoordinates.mousedownX = resizePixelRatio(e.clientX);
                mouseCoordinates.mousedownY = resizePixelRatio(e.clientY);
            }
        };
        document.body.onmouseup = (e) => {
            if (cropping) {
                let browserZoomlevel = window.devicePixelRatio
                mouseCoordinates.mouseupX = resizePixelRatio(e.clientX);
                mouseCoordinates.mouseupY = resizePixelRatio(e.clientY); 
                enableScrolling();
                cropping = false;

                let canvas = document.createElement('canvas');
                let screenshot = new Image();
                screenshot.setAttribute("id", "imageID")

                let imageURL = request.url;
                screenshot.src = imageURL;
                setTimeout(() => {
                    canvas.width = screenshot.width;
                    canvas.height = screenshot.height;

                    let ctx = canvas.getContext('2d');
                    let croppedWidth = mouseCoordinates.mouseupX - mouseCoordinates.mousedownX;
                    let croppedHeight = mouseCoordinates.mouseupY - mouseCoordinates.mousedownY;

                    ctx.drawImage(screenshot, mouseCoordinates.mousedownX, mouseCoordinates.mousedownY,
                        croppedWidth, croppedHeight,
                        0, 0, croppedWidth, croppedHeight);
                    imageURL = canvas.toDataURL('image/jpeg');
                    screenshot.src = imageURL;

                    setTimeout(() => {
                        let croppedcanvas = document.createElement('canvas');
                        croppedcanvas.width = croppedWidth;
                        croppedcanvas.height = croppedHeight;
                        
                        let croppedctx = croppedcanvas.getContext('2d');
                        croppedctx.drawImage(screenshot, 0, 0,
                            croppedWidth, croppedHeight,
                            0, 0, croppedWidth, croppedHeight);
    
                        imageURL = croppedcanvas.toDataURL('image/jpeg');
                        screenshot.src = imageURL
                        imageToText(screenshot.src) 
                    },100) 
                }, 100)
            };
        };
    };
});



 

        