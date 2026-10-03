import bcrypt from 'bcrypt';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const HASH_AMOUNT = 10;

const usernameTakenError = () => {
    const err = new Error('Username already taken');
    err.status = 409;
    return err;
};

export const registerUser = async (username, password) => {
    const existing = await User.findOne({ username });
    if (existing) throw usernameTakenError();

    const hashed = await bcrypt.hash(password, HASH_AMOUNT);

    let user;
    try {
        user = await User.create({ username, password: hashed });
    } catch (err) {
        if (err.code === 11000) throw usernameTakenError();
        throw err;
    }

    const { password: _, ...safeUser } = user.toObject();
    return safeUser;
};

const invalidCredentialsError = () => {
    const err = new Error('Invalid credentials');
    err.status = 401;
    return err;
};

export const authenticateUser = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) throw invalidCredentialsError();

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw invalidCredentialsError();

    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};