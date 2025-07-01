const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.set('strictQuery', false);

mongoose.connect(process.env.DBURL)
    .then(() => {
        console.log("✅ Database Connected");
        app.listen(process.env.PORT || 3000, () => {
            console.log(` Server running at http://localhost:${process.env.PORT || 3000}`);
        });
    })
    .catch((err) => {
        console.error(" Database Connection Error:", err.message);
    });