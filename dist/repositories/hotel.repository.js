"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/repositories/hotel.repository.ts
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
/**
 * Repositorio para operaciones de acceso a datos de Hoteles
 */
class HotelRepository {
    /**
     * Encuentra todos los hoteles que coincidan con los criterios de filtro
     */
    async findAll(criteria = {}) {
        const { ciudad, categoria, estrellas, destacado, precioMin, precioMax } = criteria;
        // Construir condiciones de búsqueda
        const whereConditions = {};
        if (destacado !== undefined) {
            whereConditions.destacado = destacado;
        }
        // Preparar condiciones para Category
        let categoryWhere = {};
        if (categoria) {
            // Si se proporciona ID de categoría
            whereConditions.categoryId = categoria;
        }
        if (estrellas) {
            // Si se proporciona número de estrellas
            categoryWhere = {
                ...categoryWhere,
                estrellas
            };
        }
        // Definir las relaciones a incluir
        return await models_1.Hotel.findAll({
            where: whereConditions,
            include: this.getStandardIncludes(ciudad, precioMin, precioMax, categoryWhere)
        });
    }
    /**
     * Encuentra un hotel específico por su ID
     */
    async findById(id) {
        return await models_1.Hotel.findByPk(id, {
            include: this.getStandardIncludes()
        });
    }
    /**
     * Encuentra hoteles destacados
     */
    async findDestacados(limit = 6) {
        return await models_1.Hotel.findAll({
            where: {
                destacado: true
            },
            include: this.getStandardIncludes(),
            limit
        });
    }
    /**
     * Devuelve un arreglo con las relaciones estándar para incluir en las consultas
     */
    getStandardIncludes(ciudad, precioMin, precioMax, categoryWhere = {}) {
        return [
            {
                model: models_1.Address,
                as: 'direccion',
                include: [
                    {
                        model: models_1.City,
                        as: 'ciudad',
                        where: ciudad ? { nombre: { [sequelize_1.Op.iLike]: `%${ciudad}%` } } : undefined,
                        include: [
                            {
                                model: models_1.Country,
                                as: 'pais'
                            }
                        ]
                    }
                ]
            },
            {
                model: models_1.Category,
                as: 'categoria',
                where: Object.keys(categoryWhere).length > 0 ? categoryWhere : undefined
            },
            {
                model: models_1.Rating,
                as: 'calificaciones',
                required: false
            },
            {
                model: models_1.Room,
                as: 'habitaciones',
                where: precioMin || precioMax ? {
                    precio: {
                        ...(precioMin && { [sequelize_1.Op.gte]: precioMin }),
                        ...(precioMax && { [sequelize_1.Op.lte]: precioMax })
                    }
                } : undefined,
                required: !!(precioMin || precioMax)
            }
        ];
    }
    /**
     * Busca hoteles con datos de categoría enriquecidos
     * Útil para dashboards y listados detallados
     */
    async findWithCategoryDetails(limit) {
        const options = {
            include: this.getStandardIncludes(),
            order: [['destacado', 'DESC'], ['id', 'ASC']]
        };
        if (limit) {
            options.limit = limit;
        }
        return await models_1.Hotel.findAll(options);
    }
}
exports.default = new HotelRepository();
