"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck - Desactivamos TypeScript para este archivo debido a problemas con los tipos de Express
// src/routes/room.routes.ts
const express_1 = __importDefault(require("express"));
const room_1 = require("../controllers/room");
const router = express_1.default.Router();
// Rutas implementadas con controladores reales
router.get('/hotel/:hotelId', room_1.getRoomsByHotelId);
router.get('/:id/availability', room_1.checkRoomAvailability);
router.get('/:id', room_1.getRoomById);
exports.default = router;
