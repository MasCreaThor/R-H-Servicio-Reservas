"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/repositories/category.repository.ts
const models_1 = require("../models");
/**
 * Repositorio para operaciones de acceso a datos de Categorías de Hoteles
 */
class CategoryRepository {
    /**
     * Obtiene todas las categorías
     */
    async findAll() {
        return await models_1.Category.findAll({
            order: [['estrellas', 'DESC']]
        });
    }
    /**
     * Encuentra una categoría por su ID
     */
    async findById(id) {
        return await models_1.Category.findByPk(id);
    }
    /**
     * Encuentra una categoría por el número de estrellas
     */
    async findByEstrellas(estrellas) {
        return await models_1.Category.findOne({
            where: { estrellas }
        });
    }
    /**
     * Crea una nueva categoría
     */
    async create(data) {
        return await models_1.Category.create(data);
    }
    /**
     * Actualiza una categoría existente
     */
    async update(id, data) {
        const category = await models_1.Category.findByPk(id);
        if (!category) {
            return null;
        }
        return await category.update(data);
    }
}
exports.default = new CategoryRepository();
