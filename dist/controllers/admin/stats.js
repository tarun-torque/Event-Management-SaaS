"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.stats = void 0;
const db_config_1 = __importDefault(require("../../DB/db.config"));
class stats {
}
exports.stats = stats;
_a = stats;
stats.organizer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pendingOrg = yield db_config_1.default.organizer.findMany({ where: { isVerified: false } });
    const pendingEvent = yield db_config_1.default.organizer.findMany({ where: { isVerified: false } });
});
stats.attendee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allAttendee = yield db_config_1.default.attendee.findMany();
});
