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
        let x = document.querySelector(".w-100").childNodes
        const waitChildNodes = () => {
            if (x.length == 0) {
                setTimeout(() => {
                    waitChildNodes()
                }, 100);
            } else {
                try {
                    let y = x[2].childNodes
                    const waitChildNodesAgain = () => {
                        if (y.length == 0) {
                            setTimeout(() => {
                                waitChildNodesAgain()
                            }, 100);
                        } else {
                            for (let ele of y) {
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
                } catch {
                    return
                }
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

        let mouseCoordinates = {
            mousedownX : 0,
            mousedownY : 0,
            mouseupX : 0,
            mouseupY : 0
        };

        let canvas = document.createElement("canvas");
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight;

        canvas.style.position="absolute";
        canvas.style.left=window.scrollX+"px";
        canvas.style.top=window.scrollY+"px";
        canvas.style.zIndex=100000;
        canvas.style.pointerEvents="none"; 
        let ctx = canvas.getContext("2d")
        document.body.appendChild(canvas)
        
        document.body.onmousedown = (e) => { 
            if (cropping) {
                document.body.onmousemove = (e2) =>{
                    let drawWidth = e2.clientX - e.clientX;
                    let drawHeight =  e2.clientY - e.clientY;
                    ctx.beginPath()
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    ctx.rect(e.clientX, e.clientY, drawWidth, drawHeight )
                    ctx.fillStyle = "rgba(0,0,0, 0.2)";
                    ctx.fill();
                }
                
                mouseCoordinates.mousedownX = resizePixelRatio(e.clientX);
                mouseCoordinates.mousedownY = resizePixelRatio(e.clientY);
            }
        };

        document.body.onmouseup = (e) => {
            if (cropping) {
                document.body.onmousemove = null
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                mouseCoordinates.mouseupX = resizePixelRatio(e.clientX);
                mouseCoordinates.mouseupY = resizePixelRatio(e.clientY); 
                enableScrolling();
                cropping = false;

                let screenshotCanvas = document.createElement('canvas');
                let screenshot = new Image();
                screenshot.setAttribute("id", "imageID")

                let imageURL = request.url;
                screenshot.src = imageURL;
                setTimeout(() => {
                    screenshotCanvas.width = screenshot.width;
                    screenshotCanvas.height = screenshot.height;

                    let ctx = screenshotCanvas.getContext('2d');
                    let croppedWidth = mouseCoordinates.mouseupX - mouseCoordinates.mousedownX;
                    let croppedHeight = mouseCoordinates.mouseupY - mouseCoordinates.mousedownY;

                    ctx.drawImage(screenshot, mouseCoordinates.mousedownX, mouseCoordinates.mousedownY,
                        croppedWidth, croppedHeight,
                        0, 0, croppedWidth, croppedHeight);
                    imageURL = screenshotCanvas.toDataURL('image/jpeg');
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



 

        