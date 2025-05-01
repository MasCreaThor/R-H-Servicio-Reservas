// src/config/database.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

let sequelize: Sequelize;
const databaseUrl = process.env.DATABASE_URL;

// Imprime info de depuración (solo en producción)
if (process.env.NODE_ENV === 'production') {
  console.log('Usando DATABASE_URL en modo producción');
  console.log('URL formato (oculta contraseña): postgresql://usuario:****@host:puerto/db');
}

if (databaseUrl && process.env.NODE_ENV === 'production') {
  // Configuración para producción
  sequelize = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  });
} else {
  // Configuración para desarrollo local
  const database = process.env.DB_NAME || 'hotel_reservas_db';
  const username = process.env.DB_USER || 'postgres';
  const password = process.env.DB_PASS || 'postgres';
  const host = process.env.DB_HOST || 'localhost';
  
  sequelize = new Sequelize(database, username, password, {
    host,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
}

// Función para inicializar la conexión
export const initializeDatabase = async () => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Entorno de desarrollo: verificando base de datos local');
      // Tu código existente para verificar/crear DB local
    } else {
      console.log('Entorno de producción: omitiendo verificación/creación de base de datos');
    }
    
    // Intentar conectar con la base de datos
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente');
    
    // Sincronizar los modelos (sin forzar cambios estructurales en producción)
    await sequelize.sync({ alter: process.env.NODE_ENV !== 'production' });
    console.log('Modelos sincronizados correctamente');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    throw error;
  }
};

export default sequelize;