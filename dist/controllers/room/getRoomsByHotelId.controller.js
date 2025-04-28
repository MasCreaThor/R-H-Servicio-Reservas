"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../services");
/**
 * Controlador para obtener habitaciones de un hotel específico
 * @param req Request - Debe incluir param: hotelId y puede incluir query: fechaEntrada, fechaSalida, capacidad
 * @param res Response
 * @param next NextFunction
 */
const getRoomsByHotelId = async (req, res, next) => {
    try {
        const { hotelId } = req.params;
        // Extraer y preparar opciones de filtro
        const filterOptions = {
            fechaEntrada: req.query.fechaEntrada,
            fechaSalida: req.query.fechaSalida,
            capacidad: req.query.capacidad ? Number(req.query.capacidad) : undefined
        };
        // Utilizar el servicio para buscar habitaciones
        const rooms = await services_1.roomService.findRoomsByHotelId(hotelId, filterOptions);
        // Verificar si el hotel existe
        if (rooms === null) {
            res.status(404).json({ message: `Hotel con ID ${hotelId} no encontrado` });
            return;
        }
        // Enviar respuesta
        res.json(rooms);
    }
    catch (error) {
        console.error('Error al obtener habitaciones por hotel ID:', error);
        res.status(500).json({
            message: 'Error al obtener las habitaciones',
            error: error instanceof Error ? error.message : String(error)
        });
    }
};
exports.default = getRoomsByHotelId;
