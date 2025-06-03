"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/booking.routes.ts
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const booking_1 = require("../controllers/booking");
const router = express_1.default.Router();
// Rutas protegidas - Requieren autenticación
router.use(auth_middleware_1.authMiddleware);
// Rutas para usuarios autenticados
router.post('/', booking_1.createBooking);
router.get('/user', booking_1.getUserBookings);
router.get('/:id', booking_1.getBookingById);
router.put('/:id/cancel', booking_1.cancelBooking);
// Rutas para administradores o gestores de hotel
router.get('/', (0, auth_middleware_1.hasRole)(['ADMIN', 'HOTEL_MANAGER']), (req, res) => {
    res.json({ message: 'Obtener todas las reservas - Solo para administradores o gestores' });
});
router.put('/:id/status', (0, auth_middleware_1.hasRole)(['ADMIN', 'HOTEL_MANAGER']), (req, res) => {
    res.json({ message: `Actualizar estado de la reserva con ID: ${req.params.id} - Solo para administradores o gestores` });
});
exports.default = router;
