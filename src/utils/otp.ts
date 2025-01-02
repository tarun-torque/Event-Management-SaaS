import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../DB/db.config";

export class otp {
  static generateOtp = async () => {
    const otp = Math.floor(Math.random() * 10000);
    if (!process.env.SECRET_KEY) {
      return console.log("secret key not found");
    }
    const encryptOtp = jwt.sign({ otp }, process.env.SECRET_KEY, {
      expiresIn: "2m",
    });
    return { otp, encryptOtp };
  };

  static verifyOtp = async (otp: any, email: any) => {
    try {
      const profile = await prisma.organizer.findUnique({ where: { email } });
      const realOtp = profile?.otp;
      if (!realOtp || !process.env.SECRET_KEY) {
        return console.log("otp or secret key not found");
      }
      const verifyOtp = jwt.verify(
        realOtp,
        process.env.SECRET_KEY
      ) as JwtPayload;

      if (otp != verifyOtp.otp) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  static sendOtp = async (email:string) => {

  };
}
