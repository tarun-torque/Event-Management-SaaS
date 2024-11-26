import { Request, Response } from "express-serve-static-core";
import prisma from "../../DB/db.config";
export class stats {
    static organizer = async(req:Request,res:Response)=>{
        const pendingOrg = await prisma.organizer.findMany({where:{isVerified:false}})
        const pendingEvent = await prisma.organizer.findMany({where:{isVerified:false}})
    }

    static attendee = async(req:Request,res:Response) =>{
        const allAttendee = await prisma.attendee.findMany()
    }
}