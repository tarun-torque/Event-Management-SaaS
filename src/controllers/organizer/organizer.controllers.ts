import { Request, Response } from "express-serve-static-core";
import prisma from "../../DB/db.config";


export class event {
  static createEvent = async (req: Request, res: Response): Promise<any> => {
    const { startTime, endTime, venue, banner, eventType } = req.body;
    const organizerId = req.params.organizerId;
    try {
      const saveEvent = await prisma.event.create({
        data: { startTime, endTime, venue, banner, eventType, organizerId },
      });
      res.status(200).json({ msg: `Now give the details of ${eventType}` });
    } catch (error) {
      res.status(500).json({ msg: "Something went wrong" });
    }
  };

  static createAnniversary = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const eventId = req.params.eventId;
    const { coupleNames, years, venue, specialNote } = req.body;
    try {
      const save = await prisma.anniversary.create({
        data: { coupleNames, years, specialNote, venue, eventId },
      });
      res.status(200).json({ msg: "Anniversary event is created" });
    } catch (error) {
      res.status(500).json({ msg: "Something went wrong" });
    }
  };

  static createWedding = async (req: Request, res: Response): Promise<any> => {
    const eventId = req.params.eventId;
    const { coupleNames, theme } = req.body;
    try {
      const save = await prisma.wedding.create({
        data: { coupleNames, theme, eventId },
      });
      res.status(200).json({ msg: "Wedding event is created" });
    } catch (error) {
      res.status(500).json({ msg: "Something went wrong" });
    }
  };

  static createCorporate = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const eventId = req.params.eventId;
    const { companyName, eventPurpose } = req.body;
    try {
      const save = await prisma.corporate.create({
        data: { companyName, eventPurpose, eventId },
      });

      res.status(200).json({ msg: "Corporate event is created" });
    } catch (error) {
      res.status(500).json({ msg: "Something went wrong" });
    }
  };

  static createBirthday = async (req: Request, res: Response): Promise<any> => {
    const eventId = req.params.eventId;
    const { birthdayPersonName, age, theme, specialNote } = req.body;

    try {
      const save = await prisma.birthday.create({
        data: { birthdayPersonName, age, theme, specialNote, eventId },
      });
      res.status(200).json({ msg: "Birthday event created" });
    } catch (error) {
      res.status(500).json({ msg: "Something went wrong" });
    }
  };

  static createHouseWarming = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const eventId = req.params.eventId;
    const { hostName, description, specialRituals } = req.body;

    try {
      const save = await prisma.housewarming.create({
        data: { hostName, description, specialRituals, eventId },
      });
      res.status(200).json({ msg: "Housewarming event created" });
    } catch (error) {
      res.status(500).json({ msg: "Something went wrong" });
    }
  };

  static ticketInfo = async (req: Request, res: Response): Promise<any> => {
    const eventId = req.params.eventId;
    const {
      numberOfGeneralTicket,
      numberOfVipTickets,
      priceVipTicket,
      priceGeneralTicket,
      priceEarlyBird,
      deadline,
      discountOnEarlyBird,
      deadlineEarlyBird,
    } = req.body;

    try {
      const save = await prisma.ticketsInfo.create({
        data: {
          numberOfGeneralTicket,
          numberOfVipTickets,
          priceVipTicket,
          priceGeneralTicket,
          priceEarlyBird,
          deadline,
          discountOnEarlyBird,
          deadlineEarlyBird,
          eventId,
        },
      });
      res.status(200).json({ msg: "Ticket info created" });
    } catch (error) {
      res.status(500).json({ msg: "Something went wrong" });
    }
  };
}
