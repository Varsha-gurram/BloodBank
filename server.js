const { execSync } = require('child_process');
const fs = require('fs');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db.js');

// Load env variables
dotenv.config();

// MongoDB connection
connectDB();

// Initialize app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/test', require('./routes/testRroute.js'));
app.use('/api/v1/auth', require('./routes/authRoute.js'));
app.use('/api/v1/inventory', require('./routes/inventoryRoutes.js'));
app.use('/api/v1/analytics', require('./routes/analyticsRoutes.js'));
app.use('/api/v1/admin', require('./routes/adminRoutes.js'));

// ---------------- Deployment Configuration ----------------

// Serve static files from React build folder
app.use(express.static(path.join(__dirname, 'client/build')));

// Serve frontend for all unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// ---------------- End Deployment Config --------------------

const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.DEV_MODE} on ${PORT}`.bgBlue.white
  )
);
