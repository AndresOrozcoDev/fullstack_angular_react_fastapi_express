const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.API_KEY, (err, decoded) => {
        if (err) return res.status(500).send('Token no válido.');
        req.userId = decoded.id;
        next();
    });
};