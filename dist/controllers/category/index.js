"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryByEstrellas = exports.getCategoryById = exports.getAllCategories = void 0;
// src/controllers/category/index.ts
const getAllCategories_controller_1 = __importDefault(require("./getAllCategories.controller"));
exports.getAllCategories = getAllCategories_controller_1.default;
const getCategoryById_controller_1 = __importDefault(require("./getCategoryById.controller"));
exports.getCategoryById = getCategoryById_controller_1.default;
const getCategoryByEstrellas_controller_1 = __importDefault(require("./getCategoryByEstrellas.controller"));
exports.getCategoryByEstrellas = getCategoryByEstrellas_controller_1.default;
