let urls = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "URL_COLLECTED") {
    urls = message.urls;  
    console.log("Anchors collected:", urls);
  }

  if (message.type === "GET_URL") {
    sendResponse({ urls });  
  }
});