const express = require('express');
const rateLimit = require('express-rate-limit');
const httpProxy = require('http-proxy');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());


// Create a proxy server instance
const proxy = httpProxy.createProxyServer();

// Define target servers
const userTarget = 'http://localhost:3001';
const authTarget = 'http://localhost:3002';

// Rate limiter middleware
const limiter = rateLimit({
    windowMs: 60 * 100, // 1 minute
    max: 5, // limit each IP to 2 requests per windowMs
    message: 'Too many requests from this IP, please try again later'
});

// Apply rate limiter to all requests
app.use(limiter);

// Routes
app.all('/users/*', (req, res) => {
    console.log('Forwarding request to user service:', req.url);
    proxy.web(req, res, { target: userTarget });
})

// Start server
app.listen(PORT, () => {
    console.log(`API Gateway listening at http://localhost:${PORT}`);
});
