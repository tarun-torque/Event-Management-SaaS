// TypeScript Provides Compile-Time Safety, Not Runtime Validation
// Zod Provides Runtime Validation


import { z } from "zod";

export const createEventValidation = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
  startTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid DateTime",
  }),
  endTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid DateTime",
  }),
  venue:z.string().nonempty("Venue is required"),
  banner:z.string().optional(),
  type:z.string().nonempty("Type is required"),
  agenda:z.string().nonempty('Agenda is required')
});
