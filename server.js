const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// আপনার ৫০টি এপিআই কি এখানে একটি এরেতে সাজান
const API_KEYS = [
    "KEY_1", "KEY_2", "KEY_3", // ... ৫০টি পর্যন্ত দিন
];
let currentKeyIndex = 0;

app.post('/ask-herovee', async (req, res) => {
    const { chatHistory } = req.body;
    let attempts = 0;

    while (attempts < API_KEYS.length) {
        const apiKey = API_KEYS[currentKeyIndex];
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "contents": chatHistory,
                    "system_instruction": { "parts": [{ "text": "তোমার নাম Herovee। তুমি সিয়াম বস্-এর অত্যন্ত বুদ্ধিমান AI সহকারী। বাংলায় উত্তর দাও।" }] }
                })
            });

            currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;

            if (response.ok) {
                const data = await response.json();
                return res.json({ text: data.candidates[0].content.parts[0].text });
            }
        } catch (error) {
            currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
        }
        attempts++;
    }
    res.status(500).json({ error: "সবগুলো এপিআই আপাতত ব্যস্ত।" });
});

app.listen(3000, () => console.log('Herovee Server Running on port 3000'));
