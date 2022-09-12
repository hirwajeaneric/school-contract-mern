require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db');
const studentRoutes = require('./routes/students');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admins');
const adminAuthRoutes = require('./routes/adminAuth');
const contractRoutes = require('./routes/contracts');
const registrationRoutes = require('./routes/registration');


//dabase connection
connection();

//middleware
app.use(express.json())
app.use(cors());

//routes
app.use('/student/signup', studentRoutes);
app.use('/student/login', authRoutes);
app.use('/admin/signup', adminRoutes);
app.use('/admin/login', adminAuthRoutes);
app.use('/api/contracts/', contractRoutes);
app.use('/api/registration/', registrationRoutes);

const port = process.env.PORT || 8080;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));