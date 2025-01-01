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
exports.adminActionOrganizer = void 0;
const db_config_1 = __importDefault(require("../../DB/db.config"));
class adminActionOrganizer {
}
exports.adminActionOrganizer = adminActionOrganizer;
_a = adminActionOrganizer;
adminActionOrganizer.approveOrganizer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { organizerId } = req.params;
    try {
        const approveOrganizer = yield db_config_1.default.organizer.update({
            where: { organizerId },
            data: { isVerified: true },
        });
        res.status(200).json({ message: "Organizer approved successfully" });
    }
    catch (error) {
        console.log(error);
    }
});
adminActionOrganizer.approveEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId } = req.params;
    try {
        const event = yield db_config_1.default.event.update({
            where: { eventId },
            data: { isVerified: true },
        });
    }
    catch (error) { }
});
