"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../services");
/**
 * Controlador para cancelar una reserva
 * @param req Request - Debe incluir param: id y userId (añadido por middleware de autenticación)
 * @param res Response
 * @param next NextFunction
 */
const cancelBooking = async (req, res, next) => {
    try {
        // Verificar que el usuario está autenticado
        if (!req.userId) {
            res.status(401).json({ message: 'Usuario no autenticado' });
            return;
        }
        const { id } = req.params;
        try {
            // Utilizar el servicio para cancelar la reserva
            const booking = await services_1.bookingService.cancelBooking(id, req.userId);
            // Enviar respuesta
            res.json(booking);
        }
        catch (error) {
            // Capturar errores específicos del servicio
            if (error instanceof Error) {
                if (error.message.includes('permiso')) {
                    res.status(403).json({ message: error.message });
                    return;
                }
                if (error.message.includes('ya está cancelada')) {
                    res.status(400).json({ message: error.message });
                    return;
                }
                if (error.message.includes('no encontrada')) {
                    res.status(404).json({ message: error.message });
                    return;
                }
            }
            throw error; // Re-lanzar otros errores para ser manejados por el catch externo
        }
    }
    catch (error) {
        console.error('Error al cancelar reserva:', error);
        res.status(500).json({
            message: 'Error al cancelar la reserva',
            error: error instanceof Error ? error.message : String(error)
        });
    }
};
exports.default = cancelBooking;
