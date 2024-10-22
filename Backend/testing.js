import express from "express";
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Sample route for demonstration
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Define your error tracking middleware
const errorTrackingMiddleware = (err, req, res, next) => {
    const errorDetails = {
        type: 'serverError',
        message: err.message,
        stack: err.stack,
        route: req.originalUrl,
        method: req.method,
        timestamp: new Date().toISOString(),
        projectInfo: {
            userName: 'Mihir Pande',
            projectName: 'awsome',
            platform: 'Node.js'
        }
    };

    // Send the error to your error tracking server
    fetch('https://foremost-sweltering-dew.glitch.me/error-handler', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'X-Project-Name': 'awsome',
            'X-User-Name': 'Mihir Pande'
        },
        body: JSON.stringify(errorDetails)
    }).catch(error => console.error('Error reporting failed:', error));

    // Log the error to the console (or use any other logging mechanism)
    console.error('Error details:', errorDetails);

    // Respond to the client with a generic error message
    res.status(500).send('Internal Server Error');
};

// Sample route that throws an error for demonstration
app.get('/error', (req, res) => {
    throw new Error('This is a simulated error!');
});

// Use the error tracking middleware after all routes
app.use(errorTrackingMiddleware);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
