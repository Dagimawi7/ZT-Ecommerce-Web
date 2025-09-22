// This file defines routes (functions) for user and admin authentication.
// Each function will handle requests like login or registration.

// Route for user login
const loginUser = async (req, res) => {
    // This function will handle user login
    // 'req' contains the incoming request (like email & password)
    // 'res' is used to send a response back to the client
}

// Route for user registration
const registerUser = async (req, res) => {
    // This function will handle user registration
    // 'req' has user info like name, email, password
    // 'res' sends back success/failure response
}

// Route for admin login
const adminLogin = async (req, res) => {
    // This function will handle admin login
    // 'req' contains admin credentials
    // 'res' sends back the login result
}

// Export the functions so they can be used in other files (like your router)
export { loginUser, registerUser, adminLogin };
