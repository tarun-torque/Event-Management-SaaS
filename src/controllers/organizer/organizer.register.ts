import prisma from "../../DB/db.config";
import { Request, Response } from "express-serve-static-core";
import { response } from "./types";
import { registerOrganizer } from "./types";
import { registerOrganizerValidation } from "../../validations/event.validation";
import { Password } from "../../utils/password";
import { orgId } from "./types";
import {z} from 'zod'

export class organizerRegister {
  static register = async (
    req:Request<{},{},registerOrganizer>,
    res:Response
  ) => {
    const {
      name,
      profile,
      organizationName,
      email,
      phoneNo,
      website,
      socialMediaLinks,
      password,
    } = registerOrganizerValidation.parse(req.body);
    try {
      const hash = await Password.hashPassword(password);
      const save = await prisma.organizer.create({
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
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
              message: "Validation error",
              errors: error.errors.map((err) => ({
                field: err.path[0],
                message: err.message,
              })),
            });
        }
    }
  };

  static getProfile = async(req:Request<orgId>,Res:Response)=>{
    const {organizerId} = req.params
    try {
        const profile = await prisma.organizer.findUnique({where:{organizerId}})
    
    } catch (error) {
        
    }
  }
}
