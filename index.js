async function handleDownload() {
    const userLink = document.getElementById('linkInput').value.trim();
    const loaderDiv = document.getElementById('loader');

    if (!userLink) {
        loaderDiv.innerText = "⚠️ Please paste a video link first!";
        loaderDiv.style.color = "#ff4757";
        return;
    }

    loaderDiv.innerText = "🔄 Connecting to Super Engine... Fetching Video...";
    loaderDiv.style.color = "#ffb300";

    try {
        // Yeh ek unblocked open API engine hai jo direct video source fetch karta hai
        const targetApi = `https://allorigins.win{encodeURIComponent('https://ams1.qu ://some-working-downloader-api.com' + userLink)}`;
        
        // Alternate Free Universal API Method
        const response = await fetch(`https://allorigins.win{encodeURIComponent('https://vercel.app' + userLink)}`);
        
        const data = await response.json();
        const result = JSON.parse(data.contents);

        if (result.success || result.url || result.link) {
            const finalDownloadLink = result.url || result.link || result.data.video;
            
            loaderDiv.innerText = "✅ Video Extracted! Starting your download...";
            loaderDiv.style.color = "#00ff88";
            
            // Trigger download
            window.location.href = finalDownloadLink;
        } else {
            // Backup Simple Redirect Trigger (In case API is slow)
            loaderDiv.innerText = "🔄 Redirecting to secure download stream...";
            loaderDiv.style.color = "#00f2fe";
            window.open(`https://publer.io{encodeURIComponent(userLink)}`, '_blank');
        }

    } catch (error) {
        console.error("Error:", error);
        // Agar main server block kare toh direct standard web frame open karega bina crash hue
        loaderDiv.innerText = "🚀 Opening direct download panel in new tab...";
        loaderDiv.style.color = "#00ff88";
        window.open(`https://savefrom.net{encodeURIComponent(userLink)}`, '_blank');
    }
}
