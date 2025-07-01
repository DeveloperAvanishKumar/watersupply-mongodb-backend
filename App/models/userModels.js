const mongoose = require('mongoose');

const userInformationSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    phoneNumber: { type: String, unique: true },
    address: String,
    isVerified: { type: Boolean, default: false },
    token: String, // ✅ Important
});

module.exports = mongoose.model('UserInformation', userInformationSchema);