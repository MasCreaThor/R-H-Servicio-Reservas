"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDestacadosHotels = exports.getHotelById = exports.getAllHotels = void 0;
// src/controllers/hotel/index.ts
const getAllHotels_controller_1 = __importDefault(require("./getAllHotels.controller"));
exports.getAllHotels = getAllHotels_controller_1.default;
const getHotelById_controller_1 = __importDefault(require("./getHotelById.controller"));
exports.getHotelById = getHotelById_controller_1.default;
const getDestacadosHotels_controller_1 = __importDefault(require("./getDestacadosHotels.controller"));
exports.getDestacadosHotels = getDestacadosHotels_controller_1.default;
