"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const seeders_1 = require("./config/seeders");
require("./models");
const hotel_routes_1 = __importDefault(require("./routes/hotel.routes"));
const room_routes_1 = __importDefault(require("./routes/room.routes"));
const booking_routes_1 = __importDefault(require("./routes/booking.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const cors_middleware_1 = __importDefault(require("./middlewares/cors.middleware"));
// Cargar variables de entorno
dotenv_1.default.config();
// Inicializar Express
const app = (0, express_1.default)();
// ¡Convertir PORT a número!
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
// Middleware
app.use(cors_middleware_1.default);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Rutas
app.use('/api/hotels', hotel_routes_1.default);
app.use('/api/rooms', room_routes_1.default);
app.use('/api/bookings', booking_routes_1.default);
app.use('/api/categories', category_routes_1.default);
// Ruta de prueba y health check
app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenido a la API de Reservas de Hoteles',
        environment: process.env.NODE_ENV,
        version: '1.0.0'
    });
});
app.get('/health', (req, res) => {
    res.json({
        status: 'UP',
        timestamp: new Date().toISOString()
    });
});
// Inicializar base de datos, insertar datos de prueba y arrancar servidor
const startServer = async () => {
    try {
        await (0, database_1.initializeDatabase)();
        // Insertar datos de prueba solo en desarrollo
        if (process.env.NODE_ENV !== 'production') {
            await (0, seeders_1.seedDatabase)();
        }
        // Ahora PORT es definitivamente un número
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Servidor ejecutándose en http://0.0.0.0:${PORT}`);
            console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
            console.log('Presiona CTRL+C para detener');
        });
    }
    catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1); // Salir con código de error
    }
};
// Manejar señales de terminación
process.on('SIGTERM', () => {
    console.log('SIGTERM recibido. Cerrando servidor...');
    process.exit(0);
});
process.on('SIGINT', () => {
    console.log('SIGINT recibido. Cerrando servidor...');
    process.exit(0);
});
// Capturar errores no controlados
process.on('uncaughtException', (error) => {
    console.error('Error no controlado:', error);
    process.exit(1);
});
// Iniciar el servidor
startServer();
