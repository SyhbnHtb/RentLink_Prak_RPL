// backend\backend\src\middlewares\errorHandler.js
const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Kesalahan internal server';

    // Error dari multer: file terlalu besar
    if (err.code === 'LIMIT_FILE_SIZE') {
        statusCode = 400;
        message = 'Ukuran file terlalu besar. Maksimal 2 MB';
    }

    // Error format JSON
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        statusCode = 400;
        message = 'Format JSON tidak valid';
    }

    console.error('Error:', message);

    res.status(statusCode).json({
        success: false,
        message: message
    });
};

module.exports = errorHandler;