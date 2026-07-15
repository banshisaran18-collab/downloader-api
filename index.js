const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors()); // CORS Security error ko bypass karne ke liye
app.use(express.json());

// Main Dynamic Endpoint jo video link process karega
app.post('/api/download', async (req, res) => {
    const videoUrl = req.body.url;
    if (!videoUrl) return res.status(400).json({ error: 'URL is required' });

    try {
        // Cobalt API ka upyog (Jo bina kisi login/key ke real dynamic downloads deti hai)
        const response = await axios.post('https://cobalt.tools', {
            url: videoUrl
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        if (response.data && response.data.url) {
            res.json({ downloadUrl: response.data.url });
        } else {
            res.status(400).json({ error: 'Video file could not be extracted' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Backend Server Busy. Try Again.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Real Server running on port ${PORT}`));
  
