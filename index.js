async function handleDownload() {
    const userLink = document.getElementById('linkInput').value.trim();
    const loaderDiv = document.getElementById('loader');

    // 1. Agar input box khali hai
    if (!userLink) {
        loaderDiv.innerText = "⚠️ Please paste a video link first!";
        loaderDiv.style.color = "#ff4757";
        return;
    }

    // 2. Click karte hi yeh text turant screen par dikhega
    loaderDiv.innerText = "🔄 Extracting media... Please hold on...";
    loaderDiv.style.color = "#ffb300";

    try {
        // 3. Cobalt Tools ki API se contact kar rahe hain
        const response = await fetch('https://cobalt.tools', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                url: userLink
            })
        });

        const result = await response.json();

        // 4. Checking standard responses
        if (result.status === 'stream' || result.status === 'redirect' || result.url) {
            const finalUrl = result.url;
            
            loaderDiv.innerText = "✅ Success! Starting your download...";
            loaderDiv.style.color = "#00ff88";
            
            // Video download window auto-trigger karega
            window.location.href = finalUrl;
        } else if (result.status === 'error') {
            loaderDiv.innerText = "❌ Error: " + (result.error || "Cannot extract video.");
            loaderDiv.style.color = "#ff4757";
        } else {
            loaderDiv.innerText = "❌ Video file couldn't be extracted.";
            loaderDiv.style.color = "#ff4757";
        }

    } catch (error) {
        console.error("Download Error:", error);
        loaderDiv.innerText = "⚠️ Connection error or API is down. Try again!";
        loaderDiv.style.color = "#ff4757";
    }
}
