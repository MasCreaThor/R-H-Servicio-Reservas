"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasRole = exports.authMiddleware = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// URL del servicio de autenticación
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:8080';
/**
 * Middleware para verificar el token JWT y extraer información del usuario
 */
const authMiddleware = (req, res, next) => {
    // Extraer el token del header de autorización
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'No se proporcionó token de autenticación' });
        return;
    }
    const token = authHeader.substring(7);
    // Validar el token con el servicio de autenticación
    (0, node_fetch_1.default)(`${AUTH_SERVICE_URL}/api/auth/validate-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
            'Authorization': `Bearer ${token}`
        },
        body: token
    })
        .then(response => {
        if (!response.ok) {
            throw new Error('Token inválido o expirado');
        }
        return response.json();
    })
        .then(isValid => {
        if (!isValid) {
            throw new Error('Token inválido o expirado');
        }
        // Decodificar el token para obtener el ID del usuario y su rol
        const tokenParts = token.split('.');
        if (tokenParts.length !== 3) {
            throw new Error('Token malformado');
        }
        const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());
        // Adjuntar información del usuario al objeto request
        req.userId = payload.id || payload.sub;
        req.userRole = payload.role;
        // Continuar con la siguiente función en la cadena de middleware
        next();
    })
        .catch(error => {
        console.error('Error al validar token JWT:', error);
        res.status(401).json({ message: 'Error de autenticación', error: error.message });
    });
};
exports.authMiddleware = authMiddleware;
/**
 * Middleware para verificar que el usuario tiene un rol específico
 */
const hasRole = (roles) => {
    return (req, res, next) => {
        // Verificar que el middleware de autenticación se ejecutó primero
        if (!req.userId || !req.userRole) {
            res.status(401).json({ message: 'No autenticado' });
            return;
        }
        // Verificar que el usuario tiene uno de los roles permitidos
        if (!roles.includes(req.userRole)) {
            res.status(403).json({
                message: `Acceso denegado. Se requiere rol: ${roles.join(' o ')}`
            });
            return;
        }
        // Continuar con la siguiente función en la cadena de middleware
        next();
    };
};
exports.hasRole = hasRole;
