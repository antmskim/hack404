require('dotenv').config();
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3000;

app.use(express.json({ limit: '10mb' })); // Increase limit for image data

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/scan-fish', async (req, res) => {
  try {
    const { imageData } = req.body;

    if (!imageData) {
      return res.status(400).json({ error: 'Image data is required.' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = "Is the fish in this image legal and safe to eat in Ontario, Canada? Reply only with 'legal' or 'illegal' and a short reason.";
    const image = {
      inlineData: {
        mimeType: "image/jpeg",
        data: imageData,
      },
    };

    const result = await model.generateContent([prompt, image]);
    const response = await result.response;
    const text = response.text().toLowerCase();

    let legality = null;
    if (text.includes('legal')) legality = true;
    if (text.includes('illegal')) legality = false;

    res.json({ legal: legality, reason: text });
  } catch (error) {
    console.error('Backend Gemini API error:', error);
    res.status(500).json({ error: 'Failed to process image with Gemini API.', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
