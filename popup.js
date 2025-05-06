document.addEventListener("DOMContentLoaded", () => {
  const urlList = document.getElementById("urls");

  urlList.innerHTML = "";

  const allUrls = Array.from(document.querySelectorAll("a")).map((a) => a.href);

  chrome.runtime.sendMessage({ type: "GET_URL" }, (response) => {
    if (!response.urls || response.urls.length === 0) {
      urlList.innerHTML = "<p>No URLs found on this page.</p>";
      return;
    }

    // Get unique, non-empty, and trimmed URLs; limit to 10
    const uniqueUrls = Array.from(
      new Set(response.urls.filter((url) => url && url.trim() !== ""))
    ).slice(0, 10);

    uniqueUrls.forEach((url, index) => {
      const listItem = document.createElement("li");
      listItem.id = `url-${index}`;

      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.textContent = url;
      anchor.title = url;
      anchor.target = "_blank";
      anchor.style.display = "block";
      anchor.style.wordBreak = "break-word";

      const analyzeBtn = document.createElement("button");
      analyzeBtn.textContent = "Analyze";
      analyzeBtn.style.marginTop = "5px";
      analyzeBtn.style.padding = "5px 10px";
      analyzeBtn.style.fontSize = "13px";
      analyzeBtn.style.cursor = "pointer";

      analyzeBtn.onclick = async () => {
        analyzeBtn.disabled = true;
        analyzeBtn.textContent = "Analyzing...";

        try {
          //   const response = await fetch("http://127.0.0.1:8000/api/analyze/", {
          const response = await fetch(
            "https://securesurf.onrender.com/api/analyze/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ url }),
            }
          );

          const result = await response.json();
          console.log("🔍 Prediction Result:", result);

          const resultText = document.createElement("p");
          resultText.style.display = "block";
          resultText.style.fontSize = "14px";
          resultText.style.fontWeight = "bold";
          resultText.style.marginTop = "5px";
          resultText.style.padding = "5px";
          resultText.style.borderRadius = "5px";
          resultText.style.border = "1px solid #ccc";
          resultText.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
          resultText.style.fontFamily = "Arial, sans-serif";

          if (result) {
            if (result.is_phishing === true) {
              resultText.textContent = "⚠️ Phishing detected";
              resultText.style.color = "red";
              resultText.style.backgroundColor = "#ffe6e6";
            } else if (result.is_phishing === false) {
              resultText.textContent = "✅ Legitimate";
              resultText.style.color = "green";
              resultText.style.backgroundColor = "#e6ffe6";
            } else {
              resultText.textContent = "Unknown result";
              resultText.style.color = "orange";
              resultText.style.backgroundColor = "#fff8e6";
            }
          } else {
            resultText.textContent = `Error: ${result.error}`;
            resultText.style.color = "red";
            resultText.style.backgroundColor = "#fff0f0";
          }

          listItem.appendChild(resultText);
        } catch (error) {
          console.error("Analyze error:", error);
          const errText = document.createElement("p");
          errText.textContent = "Failed to connect to backend.";
          errText.style.color = "red";
          errText.style.marginTop = "5px";
          listItem.appendChild(errText);
        } finally {
          analyzeBtn.disabled = false;
          analyzeBtn.textContent = "Analyze";
        }
      };

      listItem.appendChild(anchor);
      listItem.appendChild(analyzeBtn);
      urlList.appendChild(listItem);
    });
  });
});
