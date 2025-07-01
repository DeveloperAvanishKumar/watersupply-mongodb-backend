const mongoose = require('mongoose');
const UserInformation = require('../../models/userModels');
const { v4: uuidv4 } = require('uuid');

// ✅ INSERT
const mUserInformationInsert = async(req, res) => {
    try {
        const { name, email, password, phoneNumber, address } = req.body;

        // Check for existing email or phone
        if (await UserInformation.findOne({ email }))
            return res.status(400).json({ message: "Email already exists" });

        if (await UserInformation.findOne({ phoneNumber }))
            return res.status(400).json({ message: "Phone number already exists" });

        // Generate token (for verification or session)
        const userToken = uuidv4();

        // Create new user with isVerified: false
        const newUser = new UserInformation({
            name,
            email,
            password,
            phoneNumber,
            address,
            token: userToken,
            isVerified: false // ✅ initially false
        });

        const savedUser = await newUser.save();

        res.status(200).json({ message: "User inserted successfully", data: savedUser });
        console.log("User inserted successfully:", savedUser);
    } catch (err) {
        res.status(500).json({ message: "Insert error", error: err.message });
    }
};



let mUserOTPVierification = async(req, res) => {
    try {
        const token = req.headers['token'];
        const { otp } = req.body;

        if (!token || !otp)
            return res.status(400).json({ message: "Token and OTP are required" });

        const user = await UserInformation.findOne({ token });

        if (!user)
            return res.status(404).json({ message: "User not found" });

        // ✅ Correct OTP check
        if (otp !== "1234")
            return res.status(401).json({ message: "Invalid OTP" });

        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: "User verified successfully", data: user });

    } catch (err) {
        res.status(500).json({ message: "Verification error", error: err.message });
    }
};

const mUserResetPassword = async(req, res) => {
    try {
        const token = req.headers['token'];
        const { newPassword } = req.body;

        if (!token || !newPassword)
            return res.status(400).json({ message: "Token (in header) and new password are required" });

        // Find user by token
        const user = await UserInformation.findOne({ token });
        if (!user)
            return res.status(404).json({ message: "Invalid token or user not found" });

        // Update password
        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error resetting password", error: err.message });
    }
};



const mUserLogin = async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // First, find user by email
        const user = await UserInformation.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email" });
        }

        // Now check password
        if (user.password !== password) {
            return res.status(401).json({ message: "Password is wrong" });
        }

        res.status(200).json({ message: "Login successful", data: user });
    } catch (err) {
        res.status(500).json({ message: "Login error", error: err.message });
    }
};





// ✅ LIST
const mUserList = async(req, res) => {
    try {
        const users = await UserInformation.find();
        if (users.length)
            res.status(200).json({ message: "User information fetched successfully", data: users });
        else
            res.status(404).json({ message: "No user information found" });
    } catch (err) {
        res.status(500).json({ message: "Error fetching user information", error: err.message });
    }
};

// ✅ DELETE
const userDelete = async(req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({ message: "Invalid or missing user ID" });

        const deletedUser = await UserInformation.findByIdAndDelete(id);
        if (!deletedUser)
            return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting user", error: err.message });
    }
};

// ✅ UPDATE
const updateUser = async(req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, phoneNumber, address } = req.body;

        const emailExists = await UserInformation.findOne({ email, _id: { $ne: id } });
        if (emailExists)
            return res.status(400).json({ message: "Email already exists for another user" });

        const phoneExists = await UserInformation.findOne({ phoneNumber, _id: { $ne: id } });
        if (phoneExists)
            return res.status(400).json({ message: "Phone number already exists for another user" });

        const updatedUser = await UserInformation.findByIdAndUpdate(
            id, { name, email, password, phoneNumber, address }, { new: true, runValidators: true }
        ).select('-__v');

        if (!updatedUser)
            return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User updated successfully", data: updatedUser });
    } catch (err) {
        res.status(500).json({ message: "Error updating user", error: err.message });
    }
};

module.exports = { mUserInformationInsert, mUserOTPVierification, mUserList, userDelete, updateUser, mUserLogin, mUserResetPassword };