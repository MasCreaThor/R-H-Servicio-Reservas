// src/config/database.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

// Priorizar DATABASE_URL para entornos de producción
const databaseUrl = process.env.DATABASE_URL;
let sequelize: Sequelize;

if (databaseUrl && process.env.NODE_ENV === 'production') {
  console.log('Conectando usando DATABASE_URL en producción...');
  // Usar la URL completa en producción
  sequelize = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Necesario para conexiones a Railway
      }
    },
    logging: false
  });
} else {
  // Configuración estándar para desarrollo
  const database = process.env.DB_NAME || 'hotel_reservas_db';
  const username = process.env.DB_USER || 'postgres';
  const password = process.env.DB_PASS || 'postgres'; // Nota: usas DB_PASS, no DB_PASSWORD
  const host = process.env.DB_HOST || 'localhost';
  const dialect = 'postgres';

  sequelize = new Sequelize(database, username, password, {
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
}

// Función para verificar y crear la base de datos si no existe
const checkAndCreateDatabase = async () => {
  // Omitir este paso en producción
  if (process.env.NODE_ENV === 'production') {
    console.log('Entorno de producción detectado, omitiendo creación de base de datos.');
    return;
  }

  // El resto de tu código existente para dev...
  const database = process.env.DB_NAME || 'hotel_reservas_db';
  const username = process.env.DB_USER || 'postgres';
  const password = process.env.DB_PASS || 'postgres';
  const host = process.env.DB_HOST || 'localhost';
  
  // Conectar a postgres y verificar/crear la base de datos
  const pool = new Pool({
    user: username,
    host: host,
    password: password,
    port: 5432,
    database: 'postgres'
  });

  try {
    // Verificar si la base de datos existe
    const checkDbResult = await pool.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [database]
    );

    // Si la base de datos no existe, crearla
    if (checkDbResult.rowCount === 0) {
      console.log(`Base de datos ${database} no encontrada, creando...`);
      await pool.query(`CREATE DATABASE ${database}`);
      console.log(`Base de datos ${database} creada exitosamente`);
    } else {
      console.log(`Base de datos ${database} ya existe`);
    }
  } catch (error) {
    console.error('Error al verificar/crear la base de datos:', error);
  } finally {
    await pool.end();
  }
};

// Función para inicializar la conexión a la base de datos
export const initializeDatabase = async () => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      await checkAndCreateDatabase();
    } else {
      console.log('Entorno de producción: omitiendo verificación/creación de base de datos');
    }
    
    // Luego intentar conectar con Sequelize
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente');
    
    // Sincronizar los modelos 
    // force:false para no eliminar datos, alter solo en desarrollo
    await sequelize.sync({ alter: process.env.NODE_ENV !== 'production' });
    console.log('Modelos sincronizados correctamente');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    throw error;
  }
};

export default sequelize;