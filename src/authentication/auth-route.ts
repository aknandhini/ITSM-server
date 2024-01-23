import express, { NextFunction, Request, Response } from "express";
import * as auth from "./auth-operation";
export const authentication = express.Router();

authentication.post("/token", async (req: Request, res: Response) => {
  let token = await auth.token(req.body);
  if (!token) {
    res.status(401).send("Access Denied");
  } else {
    res.status(200).send(token);
  }
});
