"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelBooking = exports.getBookingById = exports.getUserBookings = exports.createBooking = void 0;
// src/controllers/booking/index.ts
const createBooking_controller_1 = __importDefault(require("./createBooking.controller"));
exports.createBooking = createBooking_controller_1.default;
const getUserBookings_controller_1 = __importDefault(require("./getUserBookings.controller"));
exports.getUserBookings = getUserBookings_controller_1.default;
const getBookingById_controller_1 = __importDefault(require("./getBookingById.controller"));
exports.getBookingById = getBookingById_controller_1.default;
const cancelBooking_controller_1 = __importDefault(require("./cancelBooking.controller"));
exports.cancelBooking = cancelBooking_controller_1.default;
