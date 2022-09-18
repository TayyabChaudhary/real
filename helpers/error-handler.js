

function handleError(error, req, res, next) {
    if (typeof (error) === 'string') {
        // Custom Application Error
        return res.status(400).json({ message: error });
    }

    if (error.name === 'UnauthorizedError') {
        // Json Web Token Authentication Error
        return res.status(401).json({ message: 'Invalid Json Web Token' });
    }

    // Default 500 Server Error
    return res.status(500).json({
        message: error.message
    });
}

module.exports = handleError;