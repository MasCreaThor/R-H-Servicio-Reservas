"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Country extends sequelize_1.Model {
}
Country.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    codigo: {
        type: sequelize_1.DataTypes.STRING(3),
        allowNull: false,
        unique: true,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Country',
    tableName: 'paises',
});
exports.default = Country;
