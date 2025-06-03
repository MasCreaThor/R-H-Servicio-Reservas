"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryByEstrellas = void 0;
const services_1 = require("../../services");
/**
 * Controlador para obtener o crear una categoría según el número de estrellas
 * @param req Request - Debe incluir param: estrellas (1-5)
 * @param res Response
 * @param next NextFunction
 */
const getCategoryByEstrellas = async (req, res, next) => {
    try {
        const estrellas = parseInt(req.params.estrellas);
        // Validar que estrellas es un número entre 1 y 5
        if (isNaN(estrellas) || estrellas < 1 || estrellas > 5) {
            res.status(400).json({
                message: 'El número de estrellas debe ser un número entre 1 y 5'
            });
            return;
        }
        // Utilizar el servicio para buscar o crear la categoría
        const category = await services_1.categoryService.findOrCreateByEstrellas(estrellas);
        // Enviar respuesta - No retornar el resultado de res.json()
        res.json(category);
    }
    catch (error) {
        // Usar next(error) en lugar de manejar el error aquí
        next(error);
    }
};
exports.getCategoryByEstrellas = getCategoryByEstrellas;
exports.default = exports.getCategoryByEstrellas;
