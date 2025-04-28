"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/room/room.service.ts
const repositories_1 = require("../../repositories");
/**
 * Servicio dedicado a la lógica de negocio relacionada con habitaciones
 */
class RoomService {
    /**
     * Obtiene una habitación por su ID
     */
    async findRoomById(id) {
        return await repositories_1.roomRepository.findById(id);
    }
    /**
     * Obtiene habitaciones por ID de hotel con filtros opcionales
     */
    async findRoomsByHotelId(hotelId, filterOptions = {}) {
        // Verificar si el hotel existe
        const hotelExists = await repositories_1.roomRepository.hotelExists(hotelId);
        if (!hotelExists) {
            return null;
        }
        // Preparar criterios de filtro para el repositorio
        const repositoryCriteria = {
            hotelId,
            capacidad: filterOptions.capacidad
        };
        // Obtener habitaciones
        const rooms = await repositories_1.roomRepository.findByHotelId(hotelId, repositoryCriteria);
        // Si se proporcionan fechas, verificar disponibilidad
        const { fechaEntrada, fechaSalida } = filterOptions;
        if (fechaEntrada && fechaSalida) {
            return this.checkAvailabilityForRooms(rooms, fechaEntrada, fechaSalida);
        }
        return rooms;
    }
    /**
     * Verifica disponibilidad de habitaciones para fechas específicas
     * @private
     */
    async checkAvailabilityForRooms(rooms, fechaEntrada, fechaSalida) {
        return Promise.all(rooms.map(async (room) => {
            const roomData = room.toJSON();
            const isAvailable = await this.isRoomAvailable(room.id, fechaEntrada, fechaSalida);
            roomData.disponible = isAvailable && room.disponibilidad;
            return roomData;
        }));
    }
    /**
     * Verifica la disponibilidad de una habitación para fechas específicas
     */
    async checkRoomAvailabilityForDates(roomId, fechaEntrada, fechaSalida) {
        return await this.isRoomAvailable(roomId, fechaEntrada, fechaSalida);
    }
    /**
     * Determina si una habitación está disponible para unas fechas específicas
     * @private
     */
    async isRoomAvailable(roomId, fechaEntrada, fechaSalida) {
        // Verificar si la habitación existe y está marcada como disponible
        const room = await repositories_1.roomRepository.findById(roomId);
        if (!room || !room.disponibilidad) {
            return false;
        }
        // Buscar reservas que se solapan
        const overlappingBookings = await repositories_1.roomRepository.findOverlappingBookings(roomId, fechaEntrada, fechaSalida);
        // La habitación está disponible si no hay reservas solapadas
        return overlappingBookings.length === 0;
    }
}
exports.default = new RoomService();
