const express = require('express');
const summarizeText = require('./summarize');
const app = express();
const port = 3000;


app.use(express.json());


app.use(express.static('public'));

app.post('/summarize', async (req, res) => {
  try {
    const text = req.body.text_to_summarize;
    if (!text) {
      return res.status(400).json({ error: 'No text provided for summarization' });
    }

    const summary = await summarizeText(text);
    res.send(summary);
  } catch (error) {
    console.error('Error summarizing text:', error);
    res.status(500).json({ error: 'An error occurred while summarizing the text' });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
