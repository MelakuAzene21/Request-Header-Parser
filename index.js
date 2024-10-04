const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/whoami', (req, res) => {
  const ipAddress = req.ip || req.connection.remoteAddress;
  const language = req.acceptsLanguages()[0];
  const software = req.get('User-Agent');

  res.json({
    ipaddress: ipAddress,
    language: language,
    software: software
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
