document.addEventListener('DOMContentLoaded', function() {
    const savePicBtn = document.getElementById('savePic');
    const cropButton = document.getElementById('cropButton');

    cropButton.addEventListener('click', function() { 
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
            let activeTab = tabs[0]; 
            chrome.tabs.captureVisibleTab(null, {}, function(dataUrl) { 
                chrome.tabs.sendMessage(activeTab.id, {command: "crop", url: dataUrl})
            }) 
        })
    })

    savePicBtn.addEventListener('click', function() { 
        alert("useless")
    }); 
 });