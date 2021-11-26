document.addEventListener('DOMContentLoaded', function() {
    const openPicBtn = document.getElementById('openPic');
    const takePicBtn = document.getElementById('takePic');
    
    openPicBtn.addEventListener('click', function() { 
        chrome.tabs.captureVisibleTab(null, {}, function(dataUrl) {
            const inputImage = new Image();
            inputImage.src = dataUrl; 
            let img = document.createElement('img');
            img.src = dataUrl;
            document.body.appendChild(img);
            
        })
    });

    takePicBtn.addEventListener('click', function() {
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
            let activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {command: "recognize"})
        })
        alert('takePic');
    });  
 });

 

