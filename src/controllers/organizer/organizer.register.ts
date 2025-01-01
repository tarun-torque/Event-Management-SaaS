import prisma from "../../DB/db.config";
import { Request, Response } from "express-serve-static-core";
import { response } from "./types";
import { registerOrganizer } from "./types";
import { registerOrganizerValidation } from "../../validations/event.validation";
import { Password } from "../../utils/password";
import { orgId } from "./types";
import { token } from "../../utils/token";
import { generateDeviceId } from "../../utils/others";
import { z } from "zod";
import { JwtPayload } from "jsonwebtoken";

export class organizerRegister {
  static register = async (
    req: Request<{}, {}, registerOrganizer>,
    res: Response
  ): Promise<any> => {
    const {
      name,
      profile,
      organizationName,
      email,
      phoneNo,
      website,
      socialMediaLinks,
      password,
    } = req.body;
    try {
      const hash = await Password.hashPassword(password);
      const deviceId = generateDeviceId();
      const save = await prisma.organizer.create({
        data: {
          name,
          profile,
          organizationName,
          email,
          phoneNo,
          ownerDeviceId: deviceId,
          website,
          socialMediaLinks,
          password: hash,
        },
      });

      res
        .status(200)
        .json({ message: "Account created Successfully", deviceId });
    } catch (error) {
      res.status(500).json({ msg: "Something went wrong" });
    }
  };

  static login = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    try {
      const isEmail = await prisma.organizer.findUnique({ where: { email } });
      if (isEmail?.email != email) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      if (isEmail) {
        const isPassword = await Password.comparePassword(
          password,
          isEmail?.password
        );

        if (!isPassword) {
          return res.status(400).json({ msg: "Invalid Credentials" });
        }
      }

      // check plan
      const maxDevice = 2;
      // check number of device and apply condition according to the plan
      const loggedInDevice = isEmail?.loggedInDevices.length;

      // if number of logged in device less than max device
      if (loggedInDevice != undefined && loggedInDevice < maxDevice) {
        const refreshToken = token.refreshToken({ isEmail });
        const deviceId = generateDeviceId();

        const addDeviceId = await prisma.organizer.update({
          where: {
            email,
          },
          data: {
            loggedInDevices: {
              push: deviceId,
            },
          },
        });

        res.cookie("refreshToken", refreshToken);
        res.status(200).json({ msg: "Logged in successfully" });
      }

      //if number of logged in device equal to the number of maximum device
      if (loggedInDevice == maxDevice) {
        res
          .status(400)
          .json({ msg: "Device limit full please upgrade your plan" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Something went wrong" });
    }
  };

  static logout = async (req: Request, res: Response): Promise<any> => {
    try {
      const refreshToken = req.cookies["refreshToken"];
      const decodedToken = token.decodeToken(refreshToken) as JwtPayload;
      const orgId = decodedToken.isEmail.organizerId;
      const deviceIdToRemove = decodedToken.isEmail.loggedInDevices[0];

      const organizer = await prisma.organizer.findUnique({
        where: {
          organizerId: orgId,
        },
      });

      if (!organizer) {
        return console.log("Organizer not found");
      }

      if (!orgId) {
        return;
      }
      // remove deviceId from logged in device array
      const updatedOrganizer = await prisma.organizer.update({
        where: {
          organizerId: orgId,
        },
        data: {
          loggedInDevices: {
            set: organizer.loggedInDevices.filter(
              (deviceId) => deviceId !== deviceIdToRemove
            ),
          },
        },
      });

      // clear cookie
      res.clearCookie("refreshToken");

      res.status(200).json({ msg: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ msg: "Something went wrong" });
    }
  };

  static getProfile = async (req: Request<orgId>, Res: Response) => {
    const { organizerId } = req.params;
    try {
      const profile = await prisma.organizer.findUnique({
        where: { organizerId },
      });
    } catch (error) {}
  };

  static getAllOrganizer = async (req: Request, res: Response) => {
    try {
      const allOrganizer = await prisma.organizer.findMany();
      res.status(200).json({ allOrganizer });
    } catch (error) {
      res.status(500).json("Something went wrong");
    }
  };
}
