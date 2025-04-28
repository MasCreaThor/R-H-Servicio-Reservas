"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../services");
/**
 * Controlador para obtener un hotel específico por su ID
 * @param req Request - Debe incluir param: id
 * @param res Response
 * @param next NextFunction
 */
const getHotelById = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Utilizar el servicio para buscar el hotel por ID
        const hotel = await services_1.hotelService.findHotelById(id);
        // Verificar si el hotel existe
        if (!hotel) {
            res.status(404).json({ message: `Hotel con ID ${id} no encontrado` });
            return;
        }
        // Enviar respuesta
        res.json(hotel);
    }
    catch (error) {
        console.error('Error al obtener hotel por ID:', error);
        res.status(500).json({
            message: 'Error al obtener el hotel',
            error: error instanceof Error ? error.message : String(error)
        });
    }
};
exports.default = getHotelById;
