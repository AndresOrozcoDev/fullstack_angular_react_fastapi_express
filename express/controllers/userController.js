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

// Login controller
exports.login = (req, res) => {
    const { username, password } = req.body;

    // Validación de los parámetros necesarios
    if (!username || !password) {
        return res.status(400).json({
            status_code: 400,
            message: "Faltan parámetros. Por favor, asegúrese de incluir 'username' y 'password'."
        });
    }

    // Consulta a la base de datos para verificar el usuario
    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
        if (err) {
            // Error de conexión a la base de datos
            console.error("Error de base de datos:", err);
            return res.status(500).json({
                status_code: 500,
                message: "Error interno del servidor. No se pudo acceder a la base de datos."
            });
        }
        if (!user) {
            // Usuario no encontrado
            return res.status(404).json({
                status_code: 404,
                message: "Usuario no encontrado."
            });
        }

        // Verificación de la contraseña
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            // Contraseña inválida
            return res.status(401).json({
                status_code: 401,
                message: "Contraseña incorrecta.",
                data: { auth: false, token: null }
            });
        }

        // Generación del token JWT
        try {
            const token = jwt.sign({
                id: user.id,
                username: user.username,
                role: user.role
            }, process.env.API_KEY || 'dev', { expiresIn: 86400 });

            // Envío de respuesta con el token
            return res.status(200).json({
                status_code: 200,
                message: "Inicio de sesión exitoso.",
                data: { auth: true, token }
            });
        } catch (error) {
            // Error al generar el token
            console.error("Error al generar el token JWT:", error);
            return res.status(500).json({
                status_code: 500,
                message: "Error al generar el token. Intente de nuevo más tarde."
            });
        }
    });
};

exports.getUserProfile = (req, res) => {
    db.get(`SELECT * FROM users WHERE id = ?`, [req.userId], (err, user) => {
        if (err) return res.status(500).send("Error en la consulta.");
        res.status(200).send(user);
    });
};