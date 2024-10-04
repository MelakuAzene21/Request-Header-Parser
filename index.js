const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// **Important**: Trust the first proxy
app.set('trust proxy', true);

// Serve static files from the 'public' directory
app.use(express.static('views'));

// API endpoint to get request header information
app.get('/api/whoami', (req, res) => {
    // **IP Address Retrieval**
    let ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    // If there are multiple IPs, take the first one
    if (ipAddress.includes(',')) {
        ipAddress = ipAddress.split(',')[0].trim();
    }
    
    // Remove IPv6 prefix if present
    if (ipAddress.startsWith('::ffff:')) {
        ipAddress = ipAddress.replace('::ffff:', '');
    }

    // **Language Retrieval**
    const language = req.headers['accept-language'] 
        ? req.headers['accept-language'].split(',')[0] 
        : 'unknown';

    // **Software Retrieval**
    const software = req.headers['user-agent'] || 'unknown';

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

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
