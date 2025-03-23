const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
require('./config/passport'); 

const projectRoutes = require('./routes/projects');
const communityRoutes = require('./routes/community');
const dashboardRoutes = require('./routes/dashboard');
const authRoutes = require('./routes/auth');

const app = express();


connectDB();


app.use(cors());
app.use(express.json());


app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);


app.use(passport.initialize());
app.use(passport.session());


app.use('/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
