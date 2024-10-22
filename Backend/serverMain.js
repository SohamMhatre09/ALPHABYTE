import express from 'express';
import mongoose from 'mongoose';

// Initialize Express
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:admin@alphabyte-logs.o7ate.mongodb.net/?retryWrites=true&w=majority&appName=alphabyte-logs', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Define the project schema (each project contains an array of errors)
const errorSchema = new mongoose.Schema({
    type: String,
    message: String,
    stack: String,
    route: String,
    method: String,
    timestamp: Date,
});

// Define the project schema
const projectSchema = new mongoose.Schema({
    errors: [errorSchema]
});

// Define the user schema with a `projects` object
const userSchema = new mongoose.Schema({
    userName: String,
    projects: {
        type: Map,  // Stores projects in a JSON-like format
        of: projectSchema
    }
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Route to fetch all project names for a specific user
app.get('/projects/:username', async (req, res) => {
    const { username } = req.params;

    try {
        // Find the user by username
        const user = await User.findOne({ userName: username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract the project names (keys) from the user's projects
        const projectNames = Array.from(user.projects.keys());

        res.json({
            userName: user.userName,
            projects: projectNames
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
