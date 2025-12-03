import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";


// student registration
export const registerStudent =async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        // check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await User.create({ name, email, password});
        const token = generateToken(user);
        res.status(201).json({
            success: true,
            token,
            user: { _id: user._id, name, email, role: user.role },
        });
    } catch (error) {
        next(error);
    }
}

// student / admin login
export const loginUser = async (req, res, next) => {
    try {
    const { email, password, adminKey } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw { statusCode: 401, message: 'Invalid credentials' };

    // Admin login with key
    if (user.role === 'admin' && adminKey !== process.env.ADMIN_KEY) {
      throw { statusCode: 401, message: 'Invalid admin key' };
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) throw { statusCode: 401, message: 'Invalid credentials' };

    const token = generateToken(user);
    res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
}


export const logoutUser = async (req, res) => {
  res.status(200).json({ success: true, message: "Logged out successfully" });
};
