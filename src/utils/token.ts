import jwt from "jsonwebtoken";

export class token {
  static refreshToken = (info: object) => {
    if (!process.env.SECRET_KEY) {
      return console.log("Secret key is not defined");
    }
    const refreshToken = jwt.sign(info, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    return refreshToken;
  };

  static decodeToken = (token: any) => {
    if (!process.env.SECRET_KEY) {
      return console.log("Secret key not found");
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    return decodedToken
  };
}
