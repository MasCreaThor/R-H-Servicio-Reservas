"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../services");
/**
 * Controlador para obtener los hoteles destacados
 * @param req Request - Puede incluir query: limit
 * @param res Response
 * @param next NextFunction
 */
const getDestacadosHotels = async (req, res, next) => {
    try {
        // Si se proporciona un límite, convertirlo a número
        const limit = req.query.limit ? Number(req.query.limit) : 6;
        // Usar el servicio para obtener los hoteles destacados
        const hotels = await services_1.hotelService.findDestacadosHotels(limit);
        // Asegurar que siempre devolvemos un array, incluso si es vacío
        res.json(hotels || []);
    }
    catch (error) {
        console.error('Error al obtener hoteles destacados:', error);
        res.status(500).json({
            message: 'Error al obtener hoteles destacados',
            error: error instanceof Error ? error.message : String(error)
        });
    }
};
exports.default = getDestacadosHotels;
