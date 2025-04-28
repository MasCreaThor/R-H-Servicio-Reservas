"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rating = exports.Category = exports.Address = exports.City = exports.Country = exports.BookingStatus = exports.Booking = exports.Room = exports.Hotel = void 0;
const Hotel_1 = __importDefault(require("./Hotel"));
exports.Hotel = Hotel_1.default;
const Room_1 = __importDefault(require("./Room"));
exports.Room = Room_1.default;
const Booking_1 = __importStar(require("./Booking"));
exports.Booking = Booking_1.default;
Object.defineProperty(exports, "BookingStatus", { enumerable: true, get: function () { return Booking_1.BookingStatus; } });
const Country_1 = __importDefault(require("./Country"));
exports.Country = Country_1.default;
const City_1 = __importDefault(require("./City"));
exports.City = City_1.default;
const Address_1 = __importDefault(require("./Address"));
exports.Address = Address_1.default;
const Category_1 = __importDefault(require("./Category"));
exports.Category = Category_1.default;
const Rating_1 = __importDefault(require("./Rating"));
exports.Rating = Rating_1.default;
// Relaciones geográficas
Country_1.default.hasMany(City_1.default, {
    sourceKey: 'id',
    foreignKey: 'countryId',
    as: 'ciudades'
});
City_1.default.belongsTo(Country_1.default, {
    foreignKey: 'countryId',
    as: 'pais'
});
City_1.default.hasMany(Address_1.default, {
    sourceKey: 'id',
    foreignKey: 'cityId',
    as: 'direcciones'
});
Address_1.default.belongsTo(City_1.default, {
    foreignKey: 'cityId',
    as: 'ciudad'
});
// Relaciones de hotel
Address_1.default.hasMany(Hotel_1.default, {
    sourceKey: 'id',
    foreignKey: 'addressId',
    as: 'hoteles'
});
Hotel_1.default.belongsTo(Address_1.default, {
    foreignKey: 'addressId',
    as: 'direccion'
});
Category_1.default.hasMany(Hotel_1.default, {
    sourceKey: 'id',
    foreignKey: 'categoryId',
    as: 'hoteles'
});
Hotel_1.default.belongsTo(Category_1.default, {
    foreignKey: 'categoryId',
    as: 'categoria'
});
// Relaciones de calificación
Hotel_1.default.hasMany(Rating_1.default, {
    sourceKey: 'id',
    foreignKey: 'hotelId',
    as: 'calificaciones'
});
Rating_1.default.belongsTo(Hotel_1.default, {
    foreignKey: 'hotelId',
    as: 'hotel'
});
// Relaciones de habitación y reserva
Hotel_1.default.hasMany(Room_1.default, {
    sourceKey: 'id',
    foreignKey: 'hotelId',
    as: 'habitaciones'
});
Room_1.default.belongsTo(Hotel_1.default, {
    foreignKey: 'hotelId',
    as: 'hotel'
});
Room_1.default.hasMany(Booking_1.default, {
    sourceKey: 'id',
    foreignKey: 'habitacionId',
    as: 'reservas'
});
Booking_1.default.belongsTo(Room_1.default, {
    foreignKey: 'habitacionId',
    as: 'habitacion'
});
