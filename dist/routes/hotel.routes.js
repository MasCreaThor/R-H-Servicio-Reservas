"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/hotel.routes.ts
const express_1 = __importDefault(require("express"));
const hotel_1 = require("../controllers/hotel");
const router = express_1.default.Router();
// Rutas implementadas con controladores reales
router.get('/', hotel_1.getAllHotels);
router.get('/destacados', hotel_1.getDestacadosHotels);
router.get('/:id', hotel_1.getHotelById);
exports.default = router;
