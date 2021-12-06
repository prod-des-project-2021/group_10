const image = document.getElementById('imageid')

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => { 
    console.log(request)
    if (request.command == "saveimage") {
        image.src = request.src
        image.onload = () => {
            window.resizeTo(image.width + 200, image.height + 200)
        }
    }
});