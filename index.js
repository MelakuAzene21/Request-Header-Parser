const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// API endpoint to get request header information
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

// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
