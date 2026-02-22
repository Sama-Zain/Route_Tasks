import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import User from "../../DB/Models/user.model.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, password, phone, age } = req.body;
        const existEmail = await User.findOne({ email });
        if (existEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const encryptedPhone = CryptoJS.AES.encrypt(phone, 'secret key').toString();
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone: encryptedPhone,
            age
        });
        const newuser = await newUser.save();
        return res.status(201).json({ message: "User created successfully", user: newuser });

    } catch (error) {
        return res.status(500).json({ message: "Error creating user" });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "In-valid email or password" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign(
            { userId: user._id },
            "secret",
            { expiresIn: "1d" }
        )
        return res.status(200).json({ message: "Login successful", token: token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error logging in user" }, error);
    }
};
export const auth = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        const decoded = jwt.verify(token, "secret");
        req.userId = decoded.userId;
        return next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error authenticating user" }, error);
    }
}
export const updateUser = async (req, res) => {
    try {
        const { name, email, phone, age } = req.body;
        const userId = req.userId;

        if (req.body.password) {
            return res.status(401).json({ message: "Password cannot be updated" });
        }

        if (email) {
            const existEmail = await User.findOne({ email });
            if (existEmail && existEmail._id.toString() !== userId.toString()) {
                return res.status(401).json({ message: "Email already exists" });
            }
        }
        const updatedUser = await User.findByIdAndUpdate(userId, {
            name,
            email,
            phone,
            age
        }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User updated successfully", user: updatedUser });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error updating user" });
    }
}
export const deleteUser = async (req, res) => {
    try {
        const userId = req.userId;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error deleting user" });
    }
}
export const getUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User found successfully", user: user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error getting user" });
    }

}

