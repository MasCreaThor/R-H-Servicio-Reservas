"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../services");
/**
 * Controlador para verificar disponibilidad de una habitación en fechas específicas
 * @param req Request - Debe incluir param: id y query: fechaEntrada, fechaSalida
 * @param res Response
 * @param next NextFunction
 */
const checkRoomAvailability = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { fechaEntrada, fechaSalida } = req.query;
        // Validar que se proporcionaron las fechas requeridas
        if (!fechaEntrada || !fechaSalida) {
            res.status(400).json({ message: 'Se requieren fechaEntrada y fechaSalida' });
            return;
        }
        // Utilizar el servicio para verificar disponibilidad
        const isAvailable = await services_1.roomService.checkRoomAvailabilityForDates(id, fechaEntrada, fechaSalida);
        // Enviar respuesta
        res.json({ disponible: isAvailable });
    }
    catch (error) {
        console.error('Error al verificar disponibilidad:', error);
        res.status(500).json({
            message: 'Error al verificar disponibilidad',
            error: error instanceof Error ? error.message : String(error)
        });
    }
};
exports.default = checkRoomAvailability;
