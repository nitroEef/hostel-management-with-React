// Define an error-handling middleware function
const errorHandler = (err, req, res, next) => {
    
    // Determine the status code to use for the response
    // If res.statusCode is already set, use it; otherwise, use 500 (Internal Server Error)
    const statusCode = res.statusCode ? res.statusCode : 500;
    
    // Set the HTTP status code for the response
    res.status(statusCode);
    
    // Send a JSON response containing the error message and stack trace
    // The stack trace is included only if the environment is "development"
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : null,
    });
};

// Export the error-handling middleware function
module.exports = errorHandler;
