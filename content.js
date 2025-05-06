
console.log("Securesurf AI is active on:", window.location.href);

class UrlRequest {
  static async query(payload) {
    const request = new Request(
      "http://98.81.3.93:8000/api/analyze/",
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const response = await fetch(request);

    if (!response.ok) {
      throw new Error("Unable to query url");
    }

    return response.json();
  }
}

UrlRequest.query({ url: "https://example.com" })
  .then((data) => {
    console.log(data);

    // const hasPhishing = data.find((url)=> !url.safe)

    // if(hasPhishing){
    //     window.alert(`This Website contains unsafe links`)
    // }
  })
  .catch((err) => {
    console.log(err);
  });

const anchorTags = document.getElementsByTagName("a");
let urls = [];

for (let tag of anchorTags) {
  urls.push(tag.href);
}

chrome.runtime.sendMessage({ type: "URL_COLLECTED", urls });
