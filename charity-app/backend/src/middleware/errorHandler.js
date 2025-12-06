/**
 * Centralized Error Handler Middleware
 * Handles all errors in a consistent format
 */

const errorHandler = (err, req, res, next) => {
    // Log the error for debugging
    console.error('❌ Error:', {
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        path: req.path,
        method: req.method,
    });

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({
            success: false,
            error: 'Validation Error',
            messages,
        });
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            error: 'Duplicate Entry',
            message: 'This record already exists',
        });
    }

    // Mongoose CastError (invalid ID)
    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            error: 'Invalid ID',
            message: 'The provided ID is not valid',
        });
    }

    // Express-validator errors
    if (err.array && typeof err.array === 'function') {
        return res.status(400).json({
            success: false,
            error: 'Validation Error',
            messages: err.array().map((e) => e.msg),
        });
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            error: 'Invalid Token',
            message: 'Authentication failed',
        });
    }

    // Default error
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        error: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

module.exports = errorHandler;
