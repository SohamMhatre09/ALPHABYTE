// server.js
import express from 'express'; // Use import instead of require
import mongoose from 'mongoose'; // Use import instead of require
import cors from 'cors'; // Use import instead of require

// Create an instance of Express
const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://admin:admin@alphabyte-logs.o7ate.mongodb.net/?retryWrites=true&w=majority&appName=alphabyte-logs')


// MongoDB schema for error objects
const ErrorSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    stack: {
        type: String,
        required: true,
    },
    route: {
        type: String,
        required: true,
    },
    method: {
        type: String,
        required: true,
    },
    timestamp: {
        type: String,
        required: true,
    },
}, {
    _id: false // No separate ID for error objects
});

// MongoDB schema for projects
const ProjectSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    projectName: {
        type: String,
        required: true,
    },
    errors: {
        type: [ErrorSchema],
        default: [],
    },
}, {
    timestamps: true,
});

// Model
const Project = mongoose.model('Project', ProjectSchema);

// Route to get projects by username
app.get('/get-projects', async (req, res) => {
    const { username } = req.query; // Get username from query parameters

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    try {
        const projects = await Project.find({ userName: username });
        
        // Transform projects to match the required structure
        const result = {};
        projects.forEach(project => {
            result[project.projectName] = {
                errors: project.errors,
            };
        });

        res.json({ [username]: result });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
