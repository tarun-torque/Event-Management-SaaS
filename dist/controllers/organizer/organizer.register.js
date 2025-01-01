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
exports.organizerRegister = void 0;
const db_config_1 = __importDefault(require("../../DB/db.config"));
const event_validation_1 = require("../../validations/event.validation");
const password_1 = require("../../utils/password");
const zod_1 = require("zod");
class organizerRegister {
}
exports.organizerRegister = organizerRegister;
_a = organizerRegister;
organizerRegister.register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, profile, organizationName, email, phoneNo, website, socialMediaLinks, password, } = event_validation_1.registerOrganizerValidation.parse(req.body);
    try {
        const hash = yield password_1.Password.hashPassword(password);
        const save = yield db_config_1.default.organizer.create({
            data: {
                name,
                profile,
                organizationName,
                email,
                phoneNo,
                website,
                socialMediaLinks,
                password,
            },
        });
        res.status(200).json({ message: "Account created Successfully" });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                message: "Validation error",
                errors: error.errors.map((err) => ({
                    field: err.path[0],
                    message: err.message,
                })),
            });
        }
    }
});
organizerRegister.getProfile = (req, Res) => __awaiter(void 0, void 0, void 0, function* () {
    const { organizerId } = req.params;
    try {
        const profile = yield db_config_1.default.organizer.findUnique({ where: { organizerId } });
    }
    catch (error) {
    }
});
