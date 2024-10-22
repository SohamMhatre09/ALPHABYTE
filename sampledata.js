const mongoose = require('mongoose');

// Connect to the MongoDB database
mongoose.connect('mongodb+srv://admin:admin@alphabyte-logs.o7ate.mongodb.net/?retryWrites=true&w=majority&appName=alphabyte-logs', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Connection error', err);
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

// Define the project schema (projects contain error logs)
const projectSchema = new mongoose.Schema({
    errors: [errorSchema]
});

// Define the user schema, where each user can have multiple projects
const userSchema = new mongoose.Schema({
    userName: String,
    projects: {
        type: Map,
        of: projectSchema  // Stores multiple projects with their respective error logs
    }
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Insert sample data
async function insertSampleData() {
    const sampleData = {
        userName: "JohnDoe",
        projects: {
            "AlphaProject": {
                errors: [
                    {
                        type: "serverError",
                        message: "Server crashed unexpectedly",
                        stack: "Error at server.js:45",
                        route: "/api/resource",
                        method: "GET",
                        timestamp: new Date()
                    }
                ]
            },
            "BetaProject": {
                errors: [
                    {
                        type: "clientError",
                        message: "Page not found",
                        stack: "Error at client.js:12",
                        route: "/api/users",
                        method: "POST",
                        timestamp: new Date()
                    }
                ]
            }
        }
    };

    // Save the user with projects and errors to the database
    const user = new User(sampleData);
    await user.save();

    console.log('Sample data inserted');
}

insertSampleData().catch(err => {
    console.error('Error inserting data', err);
});