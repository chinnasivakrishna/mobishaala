const User = require('../models/User');
const JWT = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const user = new User({ email, password, name });
        await user.save();

        const token = JWT.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.status(201).json({ 
            token, 
            user: { id: user._id, email, name },
            expiresIn: '7 days'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = JWT.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.json({ 
            token, 
            user: { id: user._id, email, name: user.name },
            expiresIn: '7 days'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const { userId } = req.user;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const token = JWT.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.json({ 
            token,
            expiresIn: '7 days'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}; 