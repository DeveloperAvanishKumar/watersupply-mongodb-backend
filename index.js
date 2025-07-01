const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express(); // ✅ app first

app.use(express.json());

// ✅ Serve static uploads folder
app.use('/uploads', express.static('uploads'));

app.use(express.urlencoded({ extended: true }))
    // ✅ Mount user routes
const userRoutes = require('./App/routes/mobile/userRoutes');
const categoryRoutes = require('./App/routes/mobile/categoryRoutes');
app.use('/web/api', categoryRoutes);
app.use('/web/api', userRoutes);

// ✅ MongoDB connection and server start

// Optional: Turn off strict query warnings
mongoose.set('strictQuery', false);

mongoose.connect(process.env.DBURL)
    .then(() => {
        console.log(" Database Connected");
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server running at http://localhost:${process.env.PORT || 3000}`);
        });
    })
    .catch((err) => {
        console.error(" Database Connection Error:", err.message);
    });