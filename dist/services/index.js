"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = exports.bookingService = exports.roomService = exports.hotelService = void 0;
// src/services/index.ts
const hotel_1 = require("./hotel");
Object.defineProperty(exports, "hotelService", { enumerable: true, get: function () { return hotel_1.hotelService; } });
const room_1 = require("./room");
Object.defineProperty(exports, "roomService", { enumerable: true, get: function () { return room_1.roomService; } });
const booking_1 = require("./booking");
Object.defineProperty(exports, "bookingService", { enumerable: true, get: function () { return booking_1.bookingService; } });
const category_1 = require("./category");
Object.defineProperty(exports, "categoryService", { enumerable: true, get: function () { return category_1.categoryService; } });
