async function handleDownload() {
    const userLink = document.getElementById('linkInput').value.trim();
    const loaderDiv = document.getElementById('loader');

    // 1. Check karein agar input box khali hai
    if (!userLink) {
        loaderDiv.innerText = "⚠️ Please paste a video link first!";
        loaderDiv.style.color = "#ff4757";
        return;
    }

    // 2. Status message show karein
    loaderDiv.innerText = "🔄 Processing via Proxy Server... Please wait...";
    loaderDiv.style.color = "#ffb300";

    try {
        // Hum ek alternate free public instance use kar rahe hain jo kabhi busy nahi rehta
        const apiUrl = 'https://wuk.sh'; 

        const response = await fetch(apiUrl, {
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

        // 3. Agar response sahi mila aur url aa gaya
        if (result.url) {
            loaderDiv.innerText = "✅ Success! Starting your download...";
            loaderDiv.style.color = "#00ff88";
            
            // Video automatic download window khol dega
            window.location.href = result.url;
        } else if (result.text) {
            // Kuch instances direct url ki jagah text link dete hain
            loaderDiv.innerText = "✅ Link Extracted! Redirecting...";
            loaderDiv.style.color = "#00ff88";
            window.location.href = result.text;
        } else {
            loaderDiv.innerText = "❌ Video file couldn't be extracted. Make sure the link is public.";
            loaderDiv.style.color = "#ff4757";
        }

    } catch (error) {
        console.error("Download Error:", error);
        loaderDiv.innerText = "⚠️ Server took too long to respond. Please try another link.";
        loaderDiv.style.color = "#ff4757";
    }
    }
