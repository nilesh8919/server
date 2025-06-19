require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Employees = require('./models/Employees');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
/*mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err)); */

// Basic route
app.get('/', (req, res) => {
  res.send('Node + MongoDB app is running4!');
});


  app.get('/employees', async (req, res) => {
    try {
      const employees = await Employees.find(); // Can also add filters here
      res.json(employees);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
