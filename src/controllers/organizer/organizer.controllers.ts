import { Response, Request } from "express";
import { event, eventId, orgId, response, ticket } from "./types";
import prisma from "../../DB/db.config";

export class organizer {
  static createEvent = async (
    req: Request<orgId, {}, event>,
    res: Response
  ) => {
    const { organizerId } = req.params;
    const {
      name,
      description,
      startTime,
      endTime,
      venue,
      banner,
      type,
      agenda,
    } = req.body;

    try {
      //save
      const save = await prisma.event.create({
        data: {
          organizerId,
          name,
          description,
          startTime,
          endTime,
          venue,
          banner,
          type,
          agenda,
        },
      });

      res.status(200).json({ msg: "Event created Successfully" });
    } catch (error) {
      console.log(error);
    }
  };

  static ticketInfo = async (
    req: Request<eventId, {}, ticket>,
    res: Response<response>
  ) => {
    const { eventId } = req.params;
    const {
      numberOfGeneralTicket,
      numberOfVipTickets,
      deadline,
      discountOnEarlyBird,
      deadlineEarlyBird,
    } = req.body;

    try {
      const save = await prisma.ticketsInfo.create({
        data: {
          eventId,
          numberOfGeneralTicket,
          numberOfVipTickets,
          deadline,
          discountOnEarlyBird,
          deadlineEarlyBird,
        },
      });

      res.status(200).json({message:'Ticket info added'})
    } catch (error) {
      console.log(error);
    }
  };
}
