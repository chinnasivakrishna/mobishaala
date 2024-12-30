

# Video Conferencing API with 100ms Integration

A robust backend service that integrates with the 100ms API to manage live video calls. This service provides REST APIs for room management and WebSocket functionality for real-time participant tracking.

## 🚀 Live Demo
- API Endpoint: [[https://mobishaala-9x9v.onrender.com](https://mobishaala-9x9v.onrender.com)]

## 🛠️ Tech Stack
- Node.js
- Express.js
- MongoDB
- WebSocket (ws)
- JWT Authentication
- 100ms API Integration

## 📋 Features
- User Authentication (Register/Login)
- Video Room Management
- Real-time Participant Tracking
- Secure Token Generation
- WebSocket Integration
- Database Integration

## 🏗️ Project Structure
```
project/
├── src/
│   ├── models/
│   │   ├── User.js         # User schema and model
│   │   ├── Room.js         # Room schema and model
│   │   └── Participant.js  # Participant schema and model
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── roomController.js    # Room management logic
│   │   └── participantController.js
│   ├── routes/
│   │   ├── authRoutes.js   # Authentication routes
│   │   └── roomRoutes.js   # Room management routes
│   ├── middleware/
│   │   ├── auth.js         # JWT authentication middleware
│   │   └── errorHandler.js # Global error handler
│   ├── config/
│   │   └── database.js     # Database configuration
│   ├── services/
│   │   └── websocket.js    # WebSocket service
│   └── app.js             # Express app configuration
├── .env                   # Environment variables
└── server.js             # Server entry point
```

## 🔧 Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/video-conferencing-api.git
cd video-conferencing-api
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Variables**
Create a `.env` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
HMS_ACCESS_KEY=your_100ms_access_key
HMS_SECRET=your_100ms_secret_key
JWT_SECRET=your_jwt_secret
PORT=3000
NODE_ENV=development
```

4. **Start the server**
```bash
npm start
```

## 📌 API Endpoints

### Authentication
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh-token
```

### Room Management
```
POST /api/rooms           # Create a new room
GET /api/rooms            # List all rooms
POST /api/rooms/:roomId/token  # Generate room token
```

## 📝 API Documentation

### 1. User Registration
```bash
POST /api/auth/register
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
}
```

### 2. User Login
```bash
POST /api/auth/login
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "password123"
}
```

### 3. Create Room
```bash
POST /api/rooms
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
    "name": "Math Class 101"
}
```

### 4. Generate Room Token
```bash
POST /api/rooms/:roomId/token
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
    "role": "host"
}
```

## 🔌 WebSocket Events

### Join Room
```javascript
ws.send(JSON.stringify({
    type: "join",
    roomId: "room_id",
    userId: "user_id",
    name: "User Name"
}));
```

### Leave Room
```javascript
ws.send(JSON.stringify({
    type: "leave",
    roomId: "room_id",
    userId: "user_id"
}));
```

## 🔐 Security
- JWT-based authentication
- Token expiration and refresh mechanism
- Protected routes
- Secure WebSocket connections

## 💾 Database Schema

### User Schema
```javascript
{
    email: String,
    password: String (hashed),
    name: String,
    createdAt: Date
}
```

### Room Schema
```javascript
{
    roomId: String,
    name: String,
    createdBy: ObjectId,
    createdAt: Date,
    active: Boolean
}
```

### Participant Schema
```javascript
{
    roomId: String,
    userId: ObjectId,
    name: String,
    joinedAt: Date,
    active: Boolean
}
```

## 🚀 Deployment

1. **Prerequisites**
   - Node.js installed on server
   - MongoDB instance
   - 100ms account and credentials

2. **Deployment Steps**
   ```bash
   # Clone repository
   git clone https://github.com/yourusername/video-conferencing-api.git

   # Install dependencies
   npm install --production

   # Set environment variables
   cp .env.example .env
   # Edit .env with production values

   # Start server
   npm start
   ```

## 📈 Error Handling
The API includes comprehensive error handling:
- Input validation
- Authentication errors
- Database errors
- 100ms API integration errors
- WebSocket connection errors


## 👥 Authors
- T. Chinna Siva Krishna - [GitHub Profile](https://github.com/chinnasivakrishna)

## 🙏 Acknowledgments
- [100ms Documentation](https://www.100ms.live/docs)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
```

