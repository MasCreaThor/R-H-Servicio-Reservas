"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingStatus = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
var BookingStatus;
(function (BookingStatus) {
    BookingStatus["PENDIENTE"] = "PENDIENTE";
    BookingStatus["CONFIRMADA"] = "CONFIRMADA";
    BookingStatus["CANCELADA"] = "CANCELADA";
    BookingStatus["COMPLETADA"] = "COMPLETADA";
})(BookingStatus || (exports.BookingStatus = BookingStatus = {}));
class Booking extends sequelize_1.Model {
}
Booking.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    habitacionId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'habitaciones',
            key: 'id',
        },
    },
    fechaEntrada: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    fechaSalida: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(BookingStatus)),
        defaultValue: BookingStatus.PENDIENTE,
    },
    precioTotal: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
    },
    numeroHuespedes: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
        },
    },
    comentarios: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Booking',
    tableName: 'reservas',
});
exports.default = Booking;
