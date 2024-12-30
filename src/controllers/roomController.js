const Room = require('../models/Room');
const JWT = require('jsonwebtoken');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const crypto = require('crypto');

// Function to generate 100ms management token
const generate100msToken = () => {
    try {
        const now = Math.floor(Date.now() / 1000);
        const exp = now + (24 * 60 * 60); // 24 hours
        
        // Simplified token payload according to 100ms specs
        const token = JWT.sign(
            {
                access_key: process.env.HMS_ACCESS_KEY,
                type: 'management',
                version: 2,
                iat: now,
                exp: exp,
                jti: crypto.randomBytes(16).toString('hex')
            },
            process.env.HMS_SECRET
        );
        return token;
    } catch (error) {
        console.error('Error generating 100ms token:', error);
        throw error;
    }
};

exports.createRoom = async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.user.userId;

        // Generate 100ms management token
        const managementToken = generate100msToken();
        console.log('Management Token:', managementToken);

        const HMS_API_URL = 'https://api.100ms.live/v2';
        const response = await fetch(`${HMS_API_URL}/rooms`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${managementToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                description: `Room for ${name}`,
                template_id: "67718cc84b6eb78daeecd227", // Replace with your template ID
                region: 'in'
            })
        });
        
        const responseData = await response.json();
        console.log('100ms API Response:', responseData);

        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to create room in 100ms');
        }

        const room = new Room({
            roomId: responseData.id,
            name: responseData.name,
            createdBy: userId
        });
        await room.save();
        
        res.json({
            ...room.toObject(),
            message: 'Room created successfully'
        });
    } catch (error) {
        console.error('Room creation error:', error);
        res.status(500).json({ 
            error: error.message,
            details: 'Failed to create room',
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

exports.getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({ active: true })
            .populate('createdBy', 'name email');
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.generateToken = async (req, res) => {
    try {
        const { roomId } = req.params;
        const userId = req.user.userId;
        
        // Verify room exists
        const room = await Room.findOne({ roomId });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        // Generate token for 100ms room
        const now = Math.floor(Date.now() / 1000);
        const token = JWT.sign({
            access_key: process.env.HMS_ACCESS_KEY,
            room_id: roomId,
            user_id: userId.toString(),
            role: 'host',
            type: 'app',
            version: 2,
            iat: now,
            exp: now + (24 * 60 * 60), // 24 hours
            jti: crypto.randomBytes(16).toString('hex')
        }, process.env.HMS_SECRET);
        
        res.json({ 
            token,
            room: room
        });
    } catch (error) {
        console.error('Token generation error:', error);
        res.status(500).json({ error: error.message });
    }
}; 