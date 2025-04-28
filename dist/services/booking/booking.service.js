"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/booking/booking.service.ts
const booking_repository_1 = __importDefault(require("../../repositories/booking.repository"));
const room_repository_1 = __importDefault(require("../../repositories/room.repository"));
const models_1 = require("../../models");
/**
 * Servicio dedicado a la lógica de negocio relacionada con reservas
 */
class BookingService {
    /**
     * Crea una nueva reserva verificando disponibilidad y calculando precio total
     */
    async createBooking(userId, bookingInput) {
        const { habitacionId, fechaEntrada, fechaSalida, numeroHuespedes, comentarios } = bookingInput;
        // Verificar que la habitación existe
        const room = await room_repository_1.default.findById(habitacionId);
        if (!room) {
            throw new Error(`La habitación con ID ${habitacionId} no existe`);
        }
        // Verificar capacidad
        if (room.capacidad < numeroHuespedes) {
            throw new Error(`La habitación tiene capacidad para ${room.capacidad} personas, se solicitaron ${numeroHuespedes}`);
        }
        // Verificar disponibilidad para las fechas
        const isAvailable = await this.checkRoomAvailability(habitacionId, fechaEntrada, fechaSalida);
        if (!isAvailable) {
            throw new Error(`La habitación no está disponible para las fechas seleccionadas`);
        }
        // Calcular precio total
        const precioTotal = this.calculateTotalPrice(room, fechaEntrada, fechaSalida);
        // Crear datos de reserva
        const bookingData = {
            userId,
            habitacionId,
            fechaEntrada: new Date(fechaEntrada),
            fechaSalida: new Date(fechaSalida),
            numeroHuespedes,
            comentarios,
            precioTotal
        };
        // Crear reserva en la base de datos
        const booking = await booking_repository_1.default.create(bookingData);
        return booking;
    }
    /**
     * Obtiene una reserva por su ID
     */
    async getBookingById(id) {
        return await booking_repository_1.default.findById(id);
    }
    /**
     * Obtiene las reservas de un usuario
     */
    async getUserBookings(userId) {
        return await booking_repository_1.default.findByUserId(userId);
    }
    /**
     * Actualiza el estado de una reserva
     */
    async updateBookingStatus(id, estado) {
        return await booking_repository_1.default.updateStatus(id, estado);
    }
    /**
     * Cancela una reserva
     */
    async cancelBooking(id, userId) {
        // Obtener la reserva
        const booking = await booking_repository_1.default.findById(id);
        if (!booking) {
            throw new Error(`Reserva con ID ${id} no encontrada`);
        }
        // Verificar que la reserva pertenece al usuario
        if (booking.userId !== userId) {
            throw new Error('No tiene permiso para cancelar esta reserva');
        }
        // Verificar que la reserva no esté ya cancelada o completada
        if (booking.estado === models_1.BookingStatus.CANCELADA) {
            throw new Error('La reserva ya está cancelada');
        }
        if (booking.estado === models_1.BookingStatus.COMPLETADA) {
            throw new Error('No se puede cancelar una reserva completada');
        }
        // Actualizar estado a CANCELADA
        return await booking_repository_1.default.updateStatus(id, models_1.BookingStatus.CANCELADA);
    }
    /**
     * Verifica la disponibilidad de una habitación para fechas específicas
     */
    async checkRoomAvailability(roomId, fechaEntrada, fechaSalida) {
        // Verificar que la habitación existe y está marcada como disponible
        const room = await room_repository_1.default.findById(roomId);
        if (!room || !room.disponibilidad) {
            return false;
        }
        // Buscar reservas que se solapan
        const overlappingBookings = await booking_repository_1.default.findOverlappingBookings(roomId, new Date(fechaEntrada), new Date(fechaSalida));
        // La habitación está disponible si no hay reservas solapadas
        return overlappingBookings.length === 0;
    }
    /**
     * Calcula el precio total de una reserva basado en el precio por noche y la duración
     * @private
     */
    calculateTotalPrice(room, fechaEntrada, fechaSalida) {
        const startDate = new Date(fechaEntrada);
        const endDate = new Date(fechaSalida);
        // Calcular duración en milisegundos
        const duration = endDate.getTime() - startDate.getTime();
        // Convertir a días (1000ms * 60s * 60m * 24h)
        const days = Math.ceil(duration / (1000 * 60 * 60 * 24));
        // Multiplicar precio por noche por número de días
        return Number(room.precio) * days;
    }
}
exports.default = new BookingService();
