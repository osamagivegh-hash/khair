/**
 * Request Logger Middleware
 * Logs incoming requests with useful information
 */

const logger = (req, res, next) => {
    const start = Date.now();

    // Log when request is received
    console.log(`📥 ${req.method} ${req.originalUrl}`);

    // Log when response is sent
    res.on('finish', () => {
        const duration = Date.now() - start;
        const statusEmoji = res.statusCode >= 400 ? '❌' : '✅';
        console.log(
            `${statusEmoji} ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`
        );
    });

    next();
};

module.exports = logger;
