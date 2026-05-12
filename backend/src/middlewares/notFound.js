// backend\backend\src\middlewares\notFound.js
const notFound = (req, res, next) => {
    const error = new Error(`Route ${req.method} ${req.originalUrl} tidak ditemukan`);
    error.statusCode = 404;
    next(error);
};

module.exports = notFound;