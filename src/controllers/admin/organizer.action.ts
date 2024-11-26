import { Request, Response } from "express-serve-static-core";
import prisma from "../../DB/db.config";
import { eventId, orgId } from "../organizer/types";

export class adminActionOrganizer {
  static approveOrganizer = async (req: Request<orgId>, res: Response) => {
    const { organizerId } = req.params;
    try {
      const approveOrganizer = await prisma.organizer.update({
        where: { organizerId },
        data: { isVerified: true },
      });

      res.status(200).json({ message: "Organizer approved successfully" });
    } catch (error) {
      console.log(error);
    }
  };

  static approveEvent = async (req: Request<eventId>, res: Response) => {
    const { eventId } = req.params;
    try {
      const event = await prisma.event.update({
        where: { eventId },
        data: { isVerified: true },
      });
    } catch (error) {}
  };
}
