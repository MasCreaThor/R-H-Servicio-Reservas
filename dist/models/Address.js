"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Address extends sequelize_1.Model {
}
Address.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    calle: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false,
    },
    numero: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
    },
    codigoPostal: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
    },
    cityId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ciudades',
            key: 'id',
        },
    },
}, {
    sequelize: database_1.default,
    modelName: 'Address',
    tableName: 'direcciones',
});
exports.default = Address;
