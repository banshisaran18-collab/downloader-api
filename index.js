async function handleDownload() {
    const userLink = document.getElementById('linkInput').value.trim();
    const loaderDiv = document.getElementById('loader');

    // 1. Check karein ki link khali toh nahi hai
    if (!userLink) {
        alert("⚠️ Please paste a video link first!");
        return;
    }

    // 2. Loading animation show karein
    loaderDiv.style.display = "block";
    loaderDiv.innerText = "🔄 Extracting media... Please hold on...";
    loaderDiv.style.color = "#ffb300";

    try {
        // 3. Free Cobalt API ko direct frontend se request bhein
        const response = await fetch('https://cobalt.tools', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                url: userLink,       // Aapka video URL
                videoQuality: '720', // Best downloadable standard quality
                audioFormat: 'mp3',  // Agar audio download ho toh mp3 standard format
                filenamePattern: 'classic' // File ka naam standard rakhne ke liye
            })
        });

        const result = await response.json();

        // 4. Check karein agar video URL mil gaya hai
        if (result.url) {
            loaderDiv.innerText = "✅ Success! Starting your download...";
            loaderDiv.style.color = "#00ff88";
            
            // Yeh user ke browser me direct download trigger kar dega
            window.location.href = result.url;
        } else {
            // Agar API link extract nahi kar payi (Jaise private video hone par)
            loaderDiv.innerText = "❌ Video couldn't be extracted. Make sure the link is public.";
            loaderDiv.style.color = "#ff4757";
        }

    } catch (error) {
        // Agar net connection ya Cobalt server down ho
        console.error("Download Error:", error);
        loaderDiv.innerText = "⚠️ Server busy. Please try again in a moment.";
        loaderDiv.style.color = "#ff4757";
    }
    }

