"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/hotel/hotel.service.ts
const repositories_1 = require("../../repositories");
const category_1 = require("../category");
/**
 * Servicio dedicado a la lógica de negocio relacionada con hoteles
 */
class HotelService {
    /**
     * Obtiene todos los hoteles con opciones de filtrado
     */
    async findAllHotels(filterOptions = {}) {
        const { estrellas, ...otherFilters } = filterOptions;
        // Transformar filtros si es necesario
        let repositoryFilters = { ...otherFilters };
        // Si se proporciona estrellas pero no categoría, intentar encontrar categoría correspondiente
        if (estrellas && !filterOptions.categoria) {
            try {
                const category = await category_1.categoryService.findOrCreateByEstrellas(estrellas);
                if (category) {
                    repositoryFilters.categoria = category.id;
                }
            }
            catch (error) {
                console.warn('No se pudo encontrar categoría por estrellas:', error);
                // Usar estrellas como filtro directo si no se puede encontrar categoría
                repositoryFilters.estrellas = estrellas;
            }
        }
        const hotels = await repositories_1.hotelRepository.findAll(repositoryFilters);
        return this.enrichHotelsWithRatings(hotels);
    }
    /**
     * Obtiene un hotel específico por su ID
     */
    async findHotelById(id) {
        const hotel = await repositories_1.hotelRepository.findById(id);
        if (!hotel)
            return null;
        return this.enrichHotelWithRating(hotel);
    }
    /**
     * Obtiene los hoteles destacados
     */
    async findDestacadosHotels(limit = 6) {
        const hotels = await repositories_1.hotelRepository.findDestacados(limit);
        return this.enrichHotelsWithRatings(hotels);
    }
    /**
     * Obtiene todos los hoteles con detalles completos de categoría
     * Útil para dashboard y vistas detalladas
     */
    async findHotelsWithFullDetails(limit) {
        const hotels = await repositories_1.hotelRepository.findWithCategoryDetails(limit);
        return this.enrichHotelsWithRatings(hotels);
    }
    /**
     * Calcula la calificación promedio de un hotel
     * @private
     */
    calculateAverageRating(ratings) {
        if (!ratings || ratings.length === 0) {
            return 0;
        }
        const totalRating = ratings.reduce((sum, rating) => sum + rating.puntuacion, 0);
        return totalRating / ratings.length;
    }
    /**
     * Enriquece múltiples hoteles con calificaciones promedio
     * @private
     */
    enrichHotelsWithRatings(hotels) {
        return hotels.map(hotel => this.enrichHotelWithRating(hotel));
    }
    /**
     * Enriquece un hotel con su calificación promedio
     * @private
     */
    enrichHotelWithRating(hotel) {
        const hotelData = hotel.toJSON();
        if (hotelData.calificaciones && hotelData.calificaciones.length > 0) {
            hotelData.calificacionPromedio = this.calculateAverageRating(hotelData.calificaciones);
        }
        else {
            hotelData.calificacionPromedio = 0;
        }
        // Asegurar que la información de categoría tenga el formato esperado
        if (hotelData.categoria) {
            hotelData.categoria = {
                id: hotelData.categoria.id,
                nombre: hotelData.categoria.nombre,
                estrellas: hotelData.categoria.estrellas,
                descripcion: hotelData.categoria.descripcion
            };
        }
        return hotelData;
    }
}
exports.default = new HotelService();
