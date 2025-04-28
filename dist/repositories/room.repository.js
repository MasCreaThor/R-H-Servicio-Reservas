"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/repositories/room.repository.ts
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
/**
 * Repositorio para operaciones de acceso a datos de Habitaciones
 */
class RoomRepository {
    /**
     * Encuentra una habitación por su ID
     */
    async findById(id) {
        return await models_1.Room.findByPk(id, {
            include: [
                {
                    model: models_1.Hotel,
                    as: 'hotel'
                }
            ]
        });
    }
    /**
     * Encuentra habitaciones por ID de hotel y otros criterios
     */
    async findByHotelId(hotelId, criteria = {}) {
        const { capacidad } = criteria;
        const whereConditions = {
            hotelId
        };
        // Filtrar por capacidad si se proporciona
        if (capacidad) {
            whereConditions.capacidad = { [sequelize_1.Op.gte]: Number(capacidad) };
        }
        return await models_1.Room.findAll({
            where: whereConditions,
            include: [
                {
                    model: models_1.Hotel,
                    as: 'hotel'
                }
            ]
        });
    }
    /**
     * Verifica si un hotel existe
     */
    async hotelExists(hotelId) {
        const hotel = await models_1.Hotel.findByPk(hotelId);
        return !!hotel;
    }
    /**
     * Encuentra reservas que se solapan con un período de fechas
     */
    async findOverlappingBookings(roomId, fechaEntrada, fechaSalida) {
        return await models_1.Booking.findAll({
            where: {
                habitacionId: roomId,
                estado: {
                    [sequelize_1.Op.notIn]: ['CANCELADA']
                },
                [sequelize_1.Op.or]: [
                    {
                        // Caso 1: fechaEntrada está entre fechaEntrada y fechaSalida de una reserva existente
                        fechaEntrada: {
                            [sequelize_1.Op.lte]: new Date(fechaEntrada)
                        },
                        fechaSalida: {
                            [sequelize_1.Op.gte]: new Date(fechaEntrada)
                        }
                    },
                    {
                        // Caso 2: fechaSalida está entre fechaEntrada y fechaSalida de una reserva existente
                        fechaEntrada: {
                            [sequelize_1.Op.lte]: new Date(fechaSalida)
                        },
                        fechaSalida: {
                            [sequelize_1.Op.gte]: new Date(fechaSalida)
                        }
                    },
                    {
                        // Caso 3: fechaEntrada y fechaSalida abarcan completamente una reserva existente
                        fechaEntrada: {
                            [sequelize_1.Op.gte]: new Date(fechaEntrada)
                        },
                        fechaSalida: {
                            [sequelize_1.Op.lte]: new Date(fechaSalida)
                        }
                    }
                ]
            }
        });
    }
}
exports.default = new RoomRepository();
