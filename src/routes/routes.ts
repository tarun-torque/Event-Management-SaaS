import { Router } from "express";
// import { organizer } from "../controllers/organizer/organizer.controllers";
import { organizerRegister } from "../controllers/organizer/organizer.register";
const router = Router()

// organizer registration endpoints
router.post('/register/organizer',organizerRegister.register)
router.get('/get/all/organizer',organizerRegister.getAllOrganizer)
router.post('/organizer/login',organizerRegister.login)
router.post('/organizer/logout',organizerRegister.logout)


// organizer event creation endpoints





export default router