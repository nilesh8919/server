require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Employees = require('./models/Employees');

const app = express();
app.use(cors());
app.use(express.json());

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Routes
    app.get('/', (req, res) => {
      res.send('Node + MongoDB app is running!');
    });

    app.get('/employees', async (req, res) => {
      try {
        const employees = await Employees.find();
        res.json(employees);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error('MongoDB connection error:', err.message);
  }
}

startServer();
