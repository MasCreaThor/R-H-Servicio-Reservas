"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/category.routes.ts
const express_1 = __importDefault(require("express"));
const category_1 = require("../controllers/category");
const router = express_1.default.Router();
// Rutas públicas - Importante: la ruta específica va ANTES de la ruta con parámetro genérico
router.get('/estrellas/:estrellas', category_1.getCategoryByEstrellas);
router.get('/:id', category_1.getCategoryById);
router.get('/', category_1.getAllCategories);
exports.default = router;
