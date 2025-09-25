// Import mongoose library to connect to MongoDB
import mongoose from "mongoose"

// Function to connect to MongoDB
const connectDB = async () => {

    // Event listener: when mongoose successfully connects, log message
    mongoose.connection.on('connected', () => {
        console.log("DB Connected") // Shows database connection is successful
    })

    // Connect to MongoDB using the URI from .env file and 'e-commerce' database
    await mongoose.connect(`${process.env.MONGODB_URI}`)
}

// Export the connectDB function to use it in other files
export default connectDB


// onnects the backend to a MongoDB database and confirms when the connection is successful.