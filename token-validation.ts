import jwt from "jsonwebtoken";
const { sign, verify } = jwt;
import { NextFunction, Request, Response } from "express";
import { secret } from "./secret-key";

export const authorization = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    console.log("token:::::", token);
    if (!token) {
      res.sendStatus(401).send("user not authorized");
    } else {
      let slicedToken = token.slice(7);
      jwt.verify(slicedToken, secret.key, (err) => {
        if (err) {
          console.log("err::::::", err);
          res.sendStatus(401).send("access denied");
        } else {
          // console.log("next calling");
          next();
        }
      });
    }
  };
};
