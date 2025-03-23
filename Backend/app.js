const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const projectRoutes = require('./routes/projects');
const communityRoutes = require('./routes/community');
const dashboardRoutes = require('./routes/dashboard');

const app = express();

// Connect to MongoDB
connectDB();

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use(express.json());

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
