import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Initialize Express
const app = express();
const port = 3000;

// Use CORS middleware
app.use(cors());  // Enable CORS for all routes and origins

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:admin@alphabyte-logs.o7ate.mongodb.net/?retryWrites=true&w=majority&appName=alphabyte-logs', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Define the error schema
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

// New route to fetch errors for a specific project
app.get('/errors/:username/:projectName', async (req, res) => {
    const { username, projectName } = req.params;

    try {
        // Find the user by username
        const user = await User.findOne({ userName: username });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check if the project exists for this user
        if (!user.projects.has(projectName)) {
            return res.status(404).json({
                success: false,
                message: 'Project not found for this user'
            });
        }

        // Get the project's errors
        const projectErrors = user.projects.get(projectName).errors;

        // Sort errors by timestamp in descending order (most recent first)
        const sortedErrors = projectErrors.sort((a, b) => 
            new Date(b.timestamp) - new Date(a.timestamp)
        );

        return res.status(200).json({
            success: true,
            data: {
                userName: user.userName,
                projectName,
                errors: sortedErrors
            }
        });

    } catch (error) {
        console.error('Error fetching project errors:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: err.message
    });
});
// Route to create a new project for an existing user
// Route to create a new project (creates user if not exists)
app.post('/create-project/:username/:projectName', async (req, res) => {
    const { username, projectName } = req.params;

    try {
        // Find or create user
        let user = await User.findOne({ userName: username });
        let userCreated = false;

        if (!user) {
            // Create new user if doesn't exist
            user = new User({
                userName: username,
                projects: new Map()
            });
            userCreated = true;
        }

        // Check if project already exists for this user
        if (user.projects.has(projectName)) {
            return res.status(400).json({
                success: false,
                message: 'Project already exists for this user'
            });
        }

        // Add new project to user's projects Map
        user.projects.set(projectName, {
            errors: [] // Initialize with empty errors array
        });

        // Save the user document
        await user.save();

        return res.status(201).json({
            success: true,
            message: userCreated ? 
                'User created and project added successfully' : 
                'Project created successfully',
            data: {
                userName: user.userName,
                projectName: projectName,
                allProjects: Array.from(user.projects.keys()),
                userCreated: userCreated
            }
        });

    } catch (error) {
        console.error('Error creating project:', error);
        return res.status(500).json({
            success: false,
            message: 'Error creating project',
            error: error.message
        });
    }
});
// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});