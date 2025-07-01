const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true, // 🔹 Must be provided
        unique: true, // 🔹 No two categories can have same name
    },
    description: {
        type: String,
        required: true, // 🔹 Must be provided
    },
    categoryImage: {
        type: String,
        default: 'default-category-image.jpg', // 🔹 If image not uploaded
    },
}, {
    timestamps: true // 🔹 Adds createdAt & updatedAt automatically
});

module.exports = mongoose.model('Category', categorySchema);