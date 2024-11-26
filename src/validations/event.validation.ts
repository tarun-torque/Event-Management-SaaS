// TypeScript Provides Compile-Time Safety, Not Runtime Validation
// Zod Provides Runtime Validation

import { optional, z } from "zod";
import { Password } from "../utils/password";

export const registerOrganizerValidation = z.object({
  name: z.string().nonempty("Please Enter your name"),
  profile: z.string().optional(),
  organizationName: z
    .string()
    .nonempty("Please enter name of your Organization"),
  email: z.string().email(),
  phoneNo: z.string().nonempty("Please Enter your Phone number"),
  password: z.string().nonempty("Please Enter Password"),
  website: z.string().optional(),
  socialMediaLinks: z.string().nonempty("Please enter social media links"),
});

export const createEventValidation = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
  startTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid DateTime",
  }),
  endTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid DateTime",
  }),
  venue: z.string().nonempty("Venue is required"),
  banner: z.string().optional(),
  type: z.string().nonempty("Type is required"),
  agenda: z
    .string()
    .min(100, { message: "Agenda must be at least 100 characters long" }),
});

export const ticketInfoValidation = z.object({
  numberOfGeneralTicket: z
    .string()
    .nonempty("Please provide number of general tickets"),
  numberOfVipTickets: z.string().nonempty("Number of VIP ticket are required"),
  deadline: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid DateTime",
  }),
  deadlineEarlyBird: z
    .string()
    .optional()
    .refine((val) => !isNaN(Date.parse(val ?? "")), {
      message: "Invalid DateTime",
    }),
  discountOnEarlyBird: z.string().optional(),
});
