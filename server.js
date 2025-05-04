const express = require('express');
const { exec } = require('child_process');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/upload', (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).send('Missing URL');

  console.log(`Received link: ${url}`);

  exec(`node terabox_upload_bot.cjs "${url}"`, (err, stdout, stderr) => {
    if (err) {
      console.error(stderr);
      return res.status(500).send(stderr);
    }
    res.send('Upload triggered');
  });
});

app.listen(3000, () => console.log('🚀 Terabox bot running on port 3000'));
