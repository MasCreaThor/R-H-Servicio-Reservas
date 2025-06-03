"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/category/category.service.ts
const category_repository_1 = __importDefault(require("../../repositories/category.repository"));
/**
 * Servicio dedicado a la lógica de negocio relacionada con categorías de hoteles
 */
class CategoryService {
    /**
     * Obtiene todas las categorías de hoteles
     */
    async getAllCategories() {
        return await category_repository_1.default.findAll();
    }
    /**
     * Obtiene una categoría por su ID
     */
    async getCategoryById(id) {
        return await category_repository_1.default.findById(id);
    }
    /**
     * Obtiene o crea una categoría según el número de estrellas
     * Útil para cuando el frontend envía estrellas en lugar de ID
     */
    async findOrCreateByEstrellas(estrellas) {
        // Validar que estrellas esté entre 1 y 5
        if (estrellas < 1 || estrellas > 5) {
            throw new Error('El número de estrellas debe estar entre 1 y 5');
        }
        // Buscar categoría existente
        let category = await category_repository_1.default.findByEstrellas(estrellas);
        // Si no existe, crear una nueva categoría
        if (!category) {
            const nombres = {
                1: 'Económico',
                2: 'Turista',
                3: 'Estándar',
                4: 'Superior',
                5: 'Lujo'
            };
            category = await category_repository_1.default.create({
                nombre: nombres[estrellas],
                estrellas,
                descripcion: `Hotel ${estrellas} estrellas`
            });
        }
        return category;
    }
    /**
     * Valida si una categoría existe
     */
    async validateCategory(categoryId) {
        const category = await category_repository_1.default.findById(categoryId);
        return !!category;
    }
}
exports.default = new CategoryService();
