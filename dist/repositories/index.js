"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRepository = exports.roomRepository = exports.hotelRepository = void 0;
// src/repositories/index.ts
const hotel_repository_1 = __importDefault(require("./hotel.repository"));
exports.hotelRepository = hotel_repository_1.default;
const room_repository_1 = __importDefault(require("./room.repository"));
exports.roomRepository = room_repository_1.default;
const category_repository_1 = __importDefault(require("./category.repository"));
exports.categoryRepository = category_repository_1.default;
