// Import necessary libraries
// express: used to create the backend server
// cors: allows frontend to talk to backend without errors
// dotenv/config: loads environment variables from .env file
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'

// App Config
// Create an Express app
const app = express()
// Set the port for server to listen on (from environment or default 4000)
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// Middleware
// Allows backend to parse JSON data sent from frontend
app.use(express.json())
// Allows frontend to access backend from another domain/port
app.use(cors())

// API Endpoints
app.use('/api/user',userRouter)

// Create a GET route at '/' that sends a message back
app.get('/', (req, res) => {
    res.send("API WORKING") // Send simple response to show server is running
})

// Start the server
// Listen for incoming requests on the specified port
app.listen(port, () => console.log('Server started on PORT : ' + port))
