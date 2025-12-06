require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

// Route imports
const donationRoutes = require('./routes/donationRoutes');
const contactRoutes = require('./routes/contactRoutes');
const healthRoutes = require('./routes/healthRoutes');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// ===== MIDDLEWARE =====

// Security middleware
app.use(
    helmet({
        contentSecurityPolicy: false, // Disabled for serving React app
        crossOriginEmbedderPolicy: false,
    })
);

// CORS configuration
app.use(
    cors({
        origin: process.env.NODE_ENV === 'production'
            ? true // Allow same origin in production
            : ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
);

// Body parsing middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Request logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// Custom logger middleware
app.use(logger);

// ===== API ROUTES =====
app.use('/api', donationRoutes);
app.use('/api', contactRoutes);
app.use('/api', healthRoutes);

// ===== SERVE STATIC FILES (React Build) =====
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

// ===== SPA FALLBACK =====
// Handle React routing - serve index.html for all non-API routes
app.get('*', (req, res, next) => {
    // Skip if it's an API request
    if (req.path.startsWith('/api')) {
        return next();
    }

    res.sendFile(path.join(publicPath, 'index.html'), (err) => {
        if (err) {
            // If index.html doesn't exist (dev mode), send a message
            if (err.code === 'ENOENT') {
                res.status(200).json({
                    message: 'API Server Running',
                    note: 'React build not found. Run "npm run build-client" to build the frontend.',
                    docs: {
                        health: 'GET /api/health',
                        donate: 'POST /api/donate',
                        donations: 'GET /api/donations',
                        contact: 'POST /api/contact',
                        contacts: 'GET /api/contacts',
                    },
                });
            } else {
                next(err);
            }
        }
    });
});

// ===== 404 HANDLER FOR API ROUTES =====
app.use('/api/*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'API endpoint not found',
        path: req.originalUrl,
    });
});

// ===== ERROR HANDLER =====
app.use(errorHandler);

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`
  🚀 Server is running!
  📍 Environment: ${process.env.NODE_ENV || 'development'}
  🌐 Local:       http://localhost:${PORT}
  📚 API Docs:    http://localhost:${PORT}/api/health
  `);
});

// ===== GRACEFUL SHUTDOWN =====
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('💤 Process terminated');
        process.exit(0);
    });
});

process.on('unhandledRejection', (err) => {
    console.log('❌ Unhandled Rejection:', err.message);
    server.close(() => {
        process.exit(1);
    });
});

module.exports = app;
