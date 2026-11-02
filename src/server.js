const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Import student routes
const studentRoutes = require('./studentRoutes');

// Home route
app.get('/', (req, res) => {
res.send('Student Management System is Running!');
});

// Student APIs
app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
