import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection details
const mongoURI = 'mongodb+srv://admin:admin@coephackathon.ny1gj.mongodb.net/';
const dbName = 'errorLogs';
const collectionName = 'aiAnalysis';

// Connect to MongoDB
mongoose.connect(`${mongoURI}${dbName}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the schema for logs
const logSchema = new mongoose.Schema({
  time: Date,
  analysis: Object,
});

// Access the specific collection from the db
const Log = mongoose.model(collectionName, logSchema, collectionName);

// API endpoint to get logs
app.get('/logs', async (req, res) => {
  try {
    const logs = await Log.find().sort({ time: -1 }).limit(100); // Fetch recent 100 logs
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving logs' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
