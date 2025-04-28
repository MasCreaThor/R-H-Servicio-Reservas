"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/repositories/booking.repository.ts
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
/**
 * Repositorio para operaciones de acceso a datos de Reservas
 */
class BookingRepository {
    /**
     * Crea una nueva reserva
     */
    async create(bookingData) {
        // La reserva se crea con estado PENDIENTE por defecto
        return await models_1.Booking.create({
            ...bookingData,
            estado: models_1.BookingStatus.PENDIENTE
        });
    }
    /**
     * Encuentra una reserva por su ID
     */
    async findById(id) {
        return await models_1.Booking.findByPk(id, {
            include: [
                {
                    model: models_1.Room,
                    as: 'habitacion',
                    include: [
                        {
                            model: models_1.Hotel,
                            as: 'hotel'
                        }
                    ]
                }
            ]
        });
    }
    /**
     * Encuentra reservas por ID de usuario
     */
    async findByUserId(userId) {
        return await models_1.Booking.findAll({
            where: {
                userId
            },
            include: [
                {
                    model: models_1.Room,
                    as: 'habitacion',
                    include: [
                        {
                            model: models_1.Hotel,
                            as: 'hotel'
                        }
                    ]
                }
            ],
            order: [
                ['fechaEntrada', 'DESC'] // Ordenar por fecha de entrada descendente
            ]
        });
    }
    /**
     * Encuentra reservas por ID de habitación
     */
    async findByRoomId(roomId) {
        return await models_1.Booking.findAll({
            where: {
                habitacionId: roomId
            },
            include: [
                {
                    model: models_1.Room,
                    as: 'habitacion'
                }
            ]
        });
    }
    /**
     * Actualiza el estado de una reserva
     */
    async updateStatus(id, estado) {
        const booking = await models_1.Booking.findByPk(id);
        if (!booking) {
            return null;
        }
        booking.estado = estado;
        await booking.save();
        return booking;
    }
    /**
     * Verifica si existen reservas que se solapan para una habitación en un período de fechas
     */
    async findOverlappingBookings(roomId, fechaEntrada, fechaSalida) {
        // Convertir string a Date si es necesario
        const startDate = typeof fechaEntrada === 'string' ? new Date(fechaEntrada) : fechaEntrada;
        const endDate = typeof fechaSalida === 'string' ? new Date(fechaSalida) : fechaSalida;
        return await models_1.Booking.findAll({
            where: {
                habitacionId: roomId,
                estado: {
                    [sequelize_1.Op.notIn]: [models_1.BookingStatus.CANCELADA]
                },
                [sequelize_1.Op.or]: [
                    {
                        // Caso 1: fechaEntrada está entre fechaEntrada y fechaSalida de una reserva existente
                        fechaEntrada: {
                            [sequelize_1.Op.lte]: startDate
                        },
                        fechaSalida: {
                            [sequelize_1.Op.gte]: startDate
                        }
                    },
                    {
                        // Caso 2: fechaSalida está entre fechaEntrada y fechaSalida de una reserva existente
                        fechaEntrada: {
                            [sequelize_1.Op.lte]: endDate
                        },
                        fechaSalida: {
                            [sequelize_1.Op.gte]: endDate
                        }
                    },
                    {
                        // Caso 3: fechaEntrada y fechaSalida abarcan completamente una reserva existente
                        fechaEntrada: {
                            [sequelize_1.Op.gte]: startDate
                        },
                        fechaSalida: {
                            [sequelize_1.Op.lte]: endDate
                        }
                    }
                ]
            }
        });
    }
}
exports.default = new BookingRepository();
