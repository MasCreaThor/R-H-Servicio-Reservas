"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsMiddleware = void 0;
// src/middlewares/cors.middleware.ts
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Opciones de CORS para permitir solicitudes del frontend
const corsOptions = {
    origin: process.env.FRONTEND_URL || '*', // Permitir origen del frontend o cualquiera en desarrollo
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Habilitar cookies/credentials para autenticación
};
exports.corsMiddleware = (0, cors_1.default)(corsOptions);
exports.default = exports.corsMiddleware;
