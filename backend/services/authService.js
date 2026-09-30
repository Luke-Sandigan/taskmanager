import bcrypt from 'bcrypt';
import User from '../models/user.js';

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