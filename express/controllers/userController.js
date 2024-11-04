const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function(err) {
        if (err) return res.status(500).send("Error en el registro.");
        res.status(201).send({ id: this.lastID, username });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
        if (err || !user) return res.status(404).send("Usuario no encontrado.");
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        const token = jwt.sign({ id: user.id }, process.env.API_KEY, { expiresIn: 86400 });
        res.status(200).send({ auth: true, token });
    });
};

exports.getUserProfile = (req, res) => {
    db.get(`SELECT * FROM users WHERE id = ?`, [req.userId], (err, user) => {
        if (err) return res.status(500).send("Error en la consulta.");
        res.status(200).send(user);
    });
};