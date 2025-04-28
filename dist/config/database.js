"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = void 0;
// src/config/database.ts
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const database = process.env.DB_NAME || 'hotel_reservas_db';
const username = process.env.DB_USER || 'postgres';
const password = process.env.DB_PASSWORD || 'postgres';
const host = process.env.DB_HOST || 'localhost';
const dialect = 'postgres';
// Función para verificar y crear la base de datos si no existe
const checkAndCreateDatabase = async () => {
    // Conectar a la base de datos postgres (base de datos por defecto)
    const pool = new pg_1.Pool({
        user: username,
        host: host,
        password: password,
        port: 5432,
        database: 'postgres' // Nos conectamos a la base de datos por defecto
    });
    try {
        // Verificar si la base de datos existe
        const checkDbResult = await pool.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [database]);
        // Si la base de datos no existe, crearla
        if (checkDbResult.rowCount === 0) {
            console.log(`Base de datos ${database} no encontrada, creando...`);
            await pool.query(`CREATE DATABASE ${database}`);
            console.log(`Base de datos ${database} creada exitosamente`);
        }
        else {
            console.log(`Base de datos ${database} ya existe`);
        }
    }
    catch (error) {
        console.error('Error al verificar/crear la base de datos:', error);
    }
    finally {
        await pool.end();
    }
};
// Configuración de Sequelize
const sequelize = new sequelize_1.Sequelize(database, username, password, {
    host,
    dialect,
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
// Función para inicializar la conexión a la base de datos
const initializeDatabase = async () => {
    try {
        // Primero verificar y crear la base de datos si no existe
        await checkAndCreateDatabase();
        // Luego intentar conectar con Sequelize
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida correctamente');
        // Sincronizar los modelos
        await sequelize.sync({ alter: true });
        console.log('Modelos sincronizados correctamente');
    }
    catch (error) {
        console.error('Error al inicializar la base de datos:', error);
        throw error;
    }
};
exports.initializeDatabase = initializeDatabase;
exports.default = sequelize;
