const express = require('express');
const router = express.Router();
// const fetch = require('node-fetch');

router.post('/', async (req, res) => {
  const { image } = req.body

  try {
    const flaskResponse = await fetch('http://127.0.0.1:9000/predict', {
      method: 'POST',
      body: JSON.stringify({ image: image }),
      headers: { 'Content-Type': 'application/json', },
    });

    const flaskData = await flaskResponse.json();

    res.json(flaskData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;