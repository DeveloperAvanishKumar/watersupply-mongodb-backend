const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./App/routes/mobile/userRoutes');
const categoryRoutes = require('./App/routes/mobile/categoryRoutes');

const app = express();
app.use(express.json());

// ✅ Static folder for image access
app.use('/uploads', express.static('uploads'));

// ✅ Apply the routes
app.use('/web/api', userRoutes);
app.use('/web/api', categoryRoutes);

// ✅ MongoDB connection
mongoose.connect(process.env.DBURL)
    .then(() => {
        console.log("✅ Database Connected");
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server running at http://localhost:${process.env.PORT || 3000}`);
        });
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });