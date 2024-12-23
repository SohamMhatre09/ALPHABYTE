import express from "express";
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Sample route for demonstration
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Define your error tracking middleware
// Error Tracking SDK for testing
// Add this middleware after all your routes

// Error Tracking SDK for mihir123
// Add this middleware after all your routes

const errorTrackingMiddleware = (err, req, res, next) => {
    const errorDetails = {
        type: 'serverError',
        message: err.message,
        stack: err.stack,
        route: req.originalUrl,
        method: req.method,
        timestamp: new Date().toISOString(),
        projectInfo: {
            userName: 'dinnerborne@gmail.com',
            projectName: 'mihir123',
            platform: 'Node.js'
        }
    };

    // Send the error to your error tracking server
    fetch('https://foremost-sweltering-dew.glitch.me/error-handler', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'X-Project-Name': 'mihir123',
            'X-User-Name': 'dinnerborne@gmail.com'
        },
        body: JSON.stringify(errorDetails)
    }).catch(error => console.error('Error reporting failed:', error));

    // Respond to the client with a generic error message
    res.status(500).send('Internal Server Error');
};

// Sample route that throws an error for demonstration
app.get('/error', (req, res, next) => {
    // Use next(err) to pass the error to the error-handling middleware
    next(new Error('This is a simulated error!'));
});

// Usage: Add the error tracking middleware after all routes
app.use(errorTrackingMiddleware);

// Start the server
const PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
