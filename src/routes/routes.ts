import { Router } from "express";
import { organizer } from "../controllers/organizer/organizer.controllers";
const router = Router()


router.post('/create/event/:organizerId',organizer.createEvent)
router.post('/ticket/Info/:eventId',organizer.ticketInfo)



export default router