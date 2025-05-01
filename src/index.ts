// src/index.ts
import express, { Application } from 'express';
import dotenv from 'dotenv';
import { initializeDatabase } from './config/database';
import { seedDatabase } from './config/seeders';
import './models';
import hotelRoutes from './routes/hotel.routes';
import roomRoutes from './routes/room.routes';
import bookingRoutes from './routes/booking.routes';
import categoryRoutes from './routes/category.routes';
import corsMiddleware from './middlewares/cors.middleware';

// Cargar variables de entorno
dotenv.config();

// Inicializar Express
const app: Application = express();
// ¡Convertir PORT a número!
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/hotels', hotelRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/categories', categoryRoutes);

// Ruta de prueba y health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Bienvenido a la API de Reservas de Hoteles',
    environment: process.env.NODE_ENV,
    version: '1.0.0'
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'UP',
    timestamp: new Date().toISOString()
  });
});

// Inicializar base de datos, insertar datos de prueba y arrancar servidor
const startServer = async () => {
  try {
    await initializeDatabase();
    
    // Insertar datos de prueba solo en desarrollo
    if (process.env.NODE_ENV !== 'production') {
      await seedDatabase();
    }
    
    // Ahora PORT es definitivamente un número
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor ejecutándose en http://0.0.0.0:${PORT}`);
      console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
      console.log('Presiona CTRL+C para detener');
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1); // Salir con código de error
  }
};

// Manejar señales de terminación
process.on('SIGTERM', () => {
  console.log('SIGTERM recibido. Cerrando servidor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT recibido. Cerrando servidor...');
  process.exit(0);
});

// Capturar errores no controlados
process.on('uncaughtException', (error) => {
  console.error('Error no controlado:', error);
  process.exit(1);
});

// Iniciar el servidor
startServer();