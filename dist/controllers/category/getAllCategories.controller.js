"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategories = void 0;
const services_1 = require("../../services");
/**
 * Controlador para obtener todas las categorías de hoteles
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
const getAllCategories = async (req, res, next) => {
    try {
        // Utilizar el servicio para obtener todas las categorías
        const categories = await services_1.categoryService.getAllCategories();
        // Enviar respuesta - No retornar el resultado de res.json()
        res.json(categories);
    }
    catch (error) {
        // Usar next(error) en lugar de manejar el error aquí
        next(error);
    }
};
exports.getAllCategories = getAllCategories;
exports.default = exports.getAllCategories;
