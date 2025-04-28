"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRoomAvailability = exports.getRoomsByHotelId = exports.getRoomById = void 0;
// src/controllers/room/index.ts
const getRoomById_controller_1 = __importDefault(require("./getRoomById.controller"));
exports.getRoomById = getRoomById_controller_1.default;
const getRoomsByHotelId_controller_1 = __importDefault(require("./getRoomsByHotelId.controller"));
exports.getRoomsByHotelId = getRoomsByHotelId_controller_1.default;
const checkRoomAvailability_controller_1 = __importDefault(require("./checkRoomAvailability.controller"));
exports.checkRoomAvailability = checkRoomAvailability_controller_1.default;
