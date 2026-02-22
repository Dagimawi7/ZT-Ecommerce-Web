import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.json({ success: false, message: 'Not Authorized Login Again' });
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        // Note: authMiddleware attaches userId to req.body, but here we decipher again to be safe/stand-alone or we can reuse logic.
        // Let's just do independent verification to be sure.

        const user = await userModel.findById(token_decode.id);

        if (user.role !== 'admin') {
            return res.json({ success: false, message: 'Not authorized as admin' });
        }

        req.user = user; // Attach full user object including role
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default adminAuth;
