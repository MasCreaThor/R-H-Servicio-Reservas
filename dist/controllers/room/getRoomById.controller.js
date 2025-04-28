"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../services");
/**
 * Controlador para obtener una habitación específica por su ID
 * @param req Request - Debe incluir param: id
 * @param res Response
 * @param next NextFunction
 */
const getRoomById = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Utilizar el servicio para buscar la habitación por ID
        const room = await services_1.roomService.findRoomById(id);
        // Verificar si la habitación existe
        if (!room) {
            res.status(404).json({ message: `Habitación con ID ${id} no encontrada` });
            return;
        }
        // Enviar respuesta
        res.json(room);
    }
    catch (error) {
        console.error('Error al obtener habitación por ID:', error);
        res.status(500).json({
            message: 'Error al obtener la habitación',
            error: error instanceof Error ? error.message : String(error)
        });
    }
};
exports.default = getRoomById;
