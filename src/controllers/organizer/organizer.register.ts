import prisma from "../../DB/db.config";
import { Request, Response } from "express-serve-static-core";
import { response } from "./types";
import { registerOrganizer } from "./types";
import { registerOrganizerValidation } from "../../validations/event.validation";
import { Password } from "../../utils/password";
import { orgId } from "./types";
import { token } from "../../utils/token";
import { generateDeviceId } from "../../utils/others";
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
      const deviceId = generateDeviceId()
      const save = await prisma.organizer.create({
        data: {
          name,
          profile,
          organizationName,
          email,
          phoneNo,
          ownerDeviceId:deviceId,
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


  static login = async(req:Request,res:Response)=>{
    const {email,password} = req.body
    try {
      const isEmail = await prisma.organizer.findUnique({where:{email}})
      if(isEmail !=email){
        return res.status(400).json({msg:'Invalid Credentials'})
      }

      if(isEmail){
        const isPassword = await Password.comparePassword(password,isEmail.password)

      if(!isPassword){
        return res.status(400).json({msg:'Invalid Credentials'})
      }
      }


      // check plan
      const maxDevice = 2
      // check number of device and apply condition according to the plan
      const loggedInDevice = isEmail?.loggedInDevices.length 

      if(loggedInDevice){
        if(loggedInDevice<maxDevice){
          const refreshToken = token.refreshToken({isEmail})
          const deviceId = generateDeviceId()
            // if pass condition , add another device id in array
            const addDeviceId = await prisma.organizer.update({
              where:{
                email
              },
              data:{
                loggedInDevices:{
                  push:deviceId
                }
              }
            })



          res.cookie('refreshToken',refreshToken)
          res.status(200).json({msg:'Logged in successfully'})
          


        }
      }

      




    
    } catch (error) {
      res.status(500).json({msg:'Something went wrong'})
    }
  }


  static getProfile = async(req:Request<orgId>,Res:Response)=>{
    const {organizerId} = req.params
    try {
        const profile = await prisma.organizer.findUnique({where:{organizerId}})
    
    } catch (error) {
        
    }
  }

  static getAllOrganizer  = async(req:Request,res:Response)=>{
    try {
      const allOrganizer = await prisma.organizer.findMany()
      res.status(200).json({allOrganizer})
      
    } catch (error) {
      res.status(500).json("Something went wrong")
    }
  }

}
