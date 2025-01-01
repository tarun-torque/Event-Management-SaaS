import { Router } from "express";
import { organizer } from "../controllers/organizer/organizer.controllers";
import { organizerRegister } from "../controllers/organizer/organizer.register";
const router = Router()

// router.post('/register/organizer',organizerRegister.register)
router.post('/create/event/:organizerId',organizer.createEvent)
router.post('/ticket/Info/:eventId',organizer.ticketInfo)
router.get('/get/all/organizer',organizerRegister.getAllOrganizer)


export default router