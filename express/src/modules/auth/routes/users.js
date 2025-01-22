const express = require('express');
const router = express.Router();

const authMiddleware = require('../../../middleware/auth');
const userController = require('../controllers/userController');

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado
 *       500:
 *         description: Error en el registro
 */
router.post('/register', userController.register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Inicia sesión de un usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token de autenticación
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Obtiene el perfil del usuario autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario recuperado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del usuario
 *                 username:
 *                   type: string
 *                   description: Nombre de usuario
 *       401:
 *         description: No autorizado (token inválido o ausente)
 *       500:
 *         description: Error en la consulta
 */
router.get('/me', authMiddleware.verifyToken, userController.getUserProfile);


module.exports = router;