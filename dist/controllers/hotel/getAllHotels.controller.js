"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../services");
/**
 * Controlador para obtener todos los hoteles con filtros opcionales
 * @param req Request - Puede incluir query params: ciudad, categoria, destacado, precioMin, precioMax
 * @param res Response
 * @param next NextFunction
 */
const getAllHotels = async (req, res, next) => {
    try {
        // Extraer y convertir parámetros de consulta
        const filterOptions = {
            ciudad: req.query.ciudad,
            categoria: req.query.categoria ? Number(req.query.categoria) : undefined,
            destacado: req.query.destacado === 'true',
            precioMin: req.query.precioMin ? Number(req.query.precioMin) : undefined,
            precioMax: req.query.precioMax ? Number(req.query.precioMax) : undefined
        };
        // Utilizar el servicio para obtener los hoteles filtrados
        const hotels = await services_1.hotelService.findAllHotels(filterOptions);
        // Enviar respuesta
        res.json(hotels);
    }
    catch (error) {
        console.error('Error al obtener hoteles:', error);
        res.status(500).json({
            message: 'Error al obtener la lista de hoteles',
            error: error instanceof Error ? error.message : String(error)
        });
    }
};
exports.default = getAllHotels;
