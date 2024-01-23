import jwt from "jsonwebtoken";
//const { sign, verify } = jwt;
import express, { NextFunction, Request, Response } from "express";
const app = express();
app.use(express.json());

export const authorization = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    //console.log("token:::::", token);
    if (!token) {
      res.status(401).send("user not authorized");
    } else {
      let slicedToken = token.slice(7);
      jwt.verify(slicedToken, process.env.SECRET_KEY as string, (err) => {
        if (err) {
          console.log("err::::::", err);
          res.status(401).send("access denied");
        } else {
          // console.log("next calling");
          next();
        }
      });
    }
  };
};
