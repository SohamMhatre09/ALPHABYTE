import mongoose from 'mongoose';

// MongoDB connection string
const mongoURI = 'mongodb+srv://admin:admin@alphabyte-logs.o7ate.mongodb.net/?retryWrites=true&w=majority&appName=alphabyte-logs';

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
    suppressReservedKeysWarning: true, // Suppress the reserved keys warning
});

// Model
const Project = mongoose.model('Project', ProjectSchema);

async function addSampleData() {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected');

        // Sample data to insert
        const sampleData = [
            {
                userName: "john.doe@example.com",
                projectName: "Project Alpha",
                errors: [
                    {
                        type: "serverError",
                        message: "Server not responding",
                        stack: "Error at line 10",
                        route: "/api/v1/resource",
                        method: "GET",
                        timestamp: new Date().toISOString(),
                    }
                ],
            },
            {
                userName: "jane.doe@example.com",
                projectName: "Project Beta",
                errors: [],
            },
            {
                userName: "john.doe@example.com",
                projectName: "Project Gamma",
                errors: [
                    {
                        type: "clientError",
                        message: "Invalid input data",
                        stack: "Error at line 20",
                        route: "/api/v1/submit",
                        method: "POST",
                        timestamp: new Date().toISOString(),
                    }
                ],
            }
        ];

        // Insert sample data into the Project collection
        const insertedData = await Project.insertMany(sampleData);
        console.log('Sample data added successfully:', insertedData); // Log the inserted data
    } catch (error) {
        console.error('Error adding sample data:', error);
    } finally {
        // Close the connection
        mongoose.connection.close();
    }
}

// Run the function
addSampleData();
