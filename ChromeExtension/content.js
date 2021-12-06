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
    console.log(result)
    return result
}


chrome.runtime.onMessage.addListener((request, sender, response) => { 
    console.log(request)

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
                console.log("mouse down");

                ctx.rect(100, 150, 200, 150)
                ctx.fillStyle ='yellow'
                ctx.fill();

                mouseCoordinates.mousedownX = resizePixelRatio(e.clientX);
                mouseCoordinates.mousedownY = resizePixelRatio(e.clientY);
                console.log(e);
            }
        };
        document.body.onmouseup = (e) => {
            if (cropping) {
                let browserZoomlevel = window.devicePixelRatio
                console.log("mousezooom",browserZoomlevel)
                console.log("mouse up");
                console.log(e);
                mouseCoordinates.mouseupX = resizePixelRatio(e.clientX);
                mouseCoordinates.mouseupY = resizePixelRatio(e.clientY); 
                console.log(mouseCoordinates);
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
                    
                    console.log(croppedWidth)
                    console.log(croppedHeight)

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
                        console.log(screenshot.src)
                        imageToText(screenshot.src)
                        setTimeout(() => {
                            chrome.runtime.sendMessage({command:"create", src: screenshot.src})
                        }, 100)
                    },100) 
                }, 100)
            };
        };
    };
});



 

        