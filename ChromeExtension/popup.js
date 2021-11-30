document.addEventListener('DOMContentLoaded', function() {
    const openPicBtn = document.getElementById('openPic');
    const cropButton = document.getElementById('cropButton');
    let mouseCoordinates;

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => { 
        console.log("popjs listener", mouseCoordinates) 
        mouseCoordinates = request.mouseCoordinates
    });

    cropButton.addEventListener('click', function() { 
        
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
            let activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {command: "crop"})

            chrome.tabs.captureVisibleTab(null, {}, function(dataUrl) { 

                let canvas = document.createElement('canvas');
                let screenshot = new Image();
                screenshot.setAttribute("id", "imageID")
                screenshot.src = dataUrl;
                screenshot.onload = () => {
                    canvas.width = screenshot.width;
                    canvas.height = screenshot.height;
                }
                let ctx = canvas.getContext('2d');

                function waitForCoordinates() {
                    console.log("eeeeeiiiiii")
                    if (mouseCoordinates === undefined) {
                        setTimeout(waitForCoordinates, 200);
                        return;
                    }
                    console.log("jooooooo")
                    let croppedWidth = mouseCoordinates.mouseupX - mouseCoordinates.mousedownX;
                    let croppedHeight = mouseCoordinates.mouseupY - mouseCoordinates.mousedownY;
                    console.log(croppedWidth)
                    console.log(croppedHeight)

                    ctx.drawImage(screenshot, mouseCoordinates.mousedownX, mouseCoordinates.mousedownY,
                        croppedWidth, croppedHeight,
                        0, 0, croppedWidth, croppedHeight);

                    screenshot.src = canvas.toDataURL('image/png');
                    console.log(screenshot.src)
                    console.log("waiting")

                    setTimeout(() => {
                        let croppedcanvas = document.createElement('canvas');
                        console.log(croppedcanvas)
                        croppedcanvas.width = croppedWidth;
                        croppedcanvas.height = croppedHeight;
                        console.log(croppedcanvas)
                        
                        let croppedctx = croppedcanvas.getContext('2d');
                        croppedctx.drawImage(screenshot, 0, 0,
                            croppedWidth, croppedHeight,
                            0, 0, croppedWidth, croppedHeight);
                        console.log(croppedWidth)
                        console.log(croppedHeight)
    
                        screenshot.src = croppedcanvas.toDataURL('image/png');
                        console.log(screenshot.src)
                        console.log(screenshot)

                        document.body.appendChild(screenshot)
                        chrome.tabs.sendMessage(activeTab.id, {command: "recognize", src: screenshot.src})
                   },100)
                }
                waitForCoordinates()
            })
        })
    })



    openPicBtn.addEventListener('click', function() { 
        alert("useless")
    }); 
 });
