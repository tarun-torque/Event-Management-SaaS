import prisma from "../../DB/db.config";
import { Password } from "../../utils/password";
import { Request, Response } from "express";
import { registerAttendee, attendeeId } from "./type";
import { response } from "../organizer/types";

export class attendeeRegister {
  static register = async (
    req: Request<{}, {}, registerAttendee>,
    res: Response<response>
  ) => {
    const { name, email, password, country,profile,state, city } = req.body;
    try {
      const hash = await Password.hashPassword(password);

      const save = await prisma.attendee.create({
        data: { name, email, password: hash, country, state, profile,city },
      });

      res.status(200).json({ message: "Attendee registered successfully" });
    } catch (error) {
      console.log(error);
    }
  };

  static login = () => {};

  static logout = () => {};
}
