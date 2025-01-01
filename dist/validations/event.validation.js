"use strict";
// TypeScript Provides Compile-Time Safety, Not Runtime Validation
// Zod Provides Runtime Validation
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketInfoValidation = exports.createEventValidation = exports.registerOrganizerValidation = void 0;
const zod_1 = require("zod");
exports.registerOrganizerValidation = zod_1.z.object({
    name: zod_1.z.string().nonempty("Please Enter your name"),
    profile: zod_1.z.string().optional(),
    organizationName: zod_1.z
        .string()
        .nonempty("Please enter name of your Organization"),
    email: zod_1.z.string().email(),
    phoneNo: zod_1.z.string().nonempty("Please Enter your Phone number"),
    password: zod_1.z.string().nonempty("Please Enter Password"),
    website: zod_1.z.string().optional(),
    socialMediaLinks: zod_1.z.string().nonempty("Please enter social media links"),
});
exports.createEventValidation = zod_1.z.object({
    name: zod_1.z.string().nonempty("Name is required"),
    description: zod_1.z.string().nonempty("Description is required"),
    startTime: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid DateTime",
    }),
    endTime: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid DateTime",
    }),
    venue: zod_1.z.string().nonempty("Venue is required"),
    banner: zod_1.z.string().optional(),
    type: zod_1.z.string().nonempty("Type is required"),
    agenda: zod_1.z
        .string()
        .min(100, { message: "Agenda must be at least 100 characters long" }),
});
exports.ticketInfoValidation = zod_1.z.object({
    numberOfGeneralTicket: zod_1.z
        .string()
        .nonempty("Please provide number of general tickets"),
    numberOfVipTickets: zod_1.z.string().nonempty("Number of VIP ticket are required"),
    deadline: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid DateTime",
    }),
    deadlineEarlyBird: zod_1.z
        .string()
        .optional()
        .refine((val) => !isNaN(Date.parse(val !== null && val !== void 0 ? val : "")), {
        message: "Invalid DateTime",
    }),
    discountOnEarlyBird: zod_1.z.string().optional(),
});
