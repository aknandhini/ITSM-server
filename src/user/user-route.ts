import express, { NextFunction, Request, Response } from "express";
import * as UOS from "./user-operations";
export const users = express.Router();

users.get("/users", async (req: Request, res: Response) => {
  //console.log("i am calling");
  let responses = await UOS.getUsers();
  res.status(200).send(responses);
});
