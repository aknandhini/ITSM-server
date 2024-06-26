import express, { NextFunction, Request, Response } from "express";
import * as UOS from "./user-operations";
export const users = express.Router();

users.get("/", async (req: Request, res: Response) => {
  //console.log("i am calling");
  let responses = await UOS.getUsers(req.query);
  res.status(200).send(responses);
});

users.post("/", async (req: Request, res: Response) => {
  let user = await UOS.createUser(req.body);
  if (!user) {
    res.status(400).send("Invalid Input");
  } else {
    res.status(200).send(user);
  }
});

users.delete("/", async (req: Request, res: Response) => {
  let deletedUser = await UOS.deleteUser(req.body);
  if (!deletedUser) {
    res.status(400).send("Invalid Input");
  } else {
    res.status(200).send(deletedUser);
  }
});
