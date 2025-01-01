"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const organizer_controllers_1 = require("../controllers/organizer/organizer.controllers");
const router = (0, express_1.Router)();
// router.post('/register/organizer',organizerRegister.register)
router.post('/create/event/:organizerId', organizer_controllers_1.organizer.createEvent);
router.post('/ticket/Info/:eventId', organizer_controllers_1.organizer.ticketInfo);
exports.default = router;
