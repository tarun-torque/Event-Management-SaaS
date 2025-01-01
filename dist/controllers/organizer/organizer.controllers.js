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
exports.organizer = void 0;
const db_config_1 = __importDefault(require("../../DB/db.config"));
const event_validation_1 = require("../../validations/event.validation");
class organizer {
}
exports.organizer = organizer;
_a = organizer;
organizer.createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { organizerId } = req.params;
    const { name, description, startTime, endTime, venue, banner, type, agenda, } = event_validation_1.createEventValidation.parse(req.body);
    try {
        //save
        const save = yield db_config_1.default.event.create({
            data: {
                organizerId,
                name,
                description,
                startTime,
                endTime,
                venue,
                banner,
                type,
                agenda,
            },
        });
        res.status(200).json({ msg: "Event created Successfully" });
    }
    catch (error) {
        console.log(error);
    }
});
organizer.ticketInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId } = req.params;
    const { numberOfGeneralTicket, numberOfVipTickets, deadline, discountOnEarlyBird, deadlineEarlyBird, } = event_validation_1.ticketInfoValidation.parse(req.body);
    try {
        const save = yield db_config_1.default.ticketsInfo.create({
            data: {
                eventId,
                numberOfGeneralTicket,
                numberOfVipTickets,
                deadline,
                discountOnEarlyBird,
                deadlineEarlyBird,
            },
        });
        res.status(200).json({ message: "Ticket info added" });
    }
    catch (error) {
        console.log(error);
    }
});
