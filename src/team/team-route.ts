import express, { NextFunction, Request, Response } from "express";
import * as TMOS from "./team-operations";
export const teams = express.Router();

teams.get("/", async (req: Request, res: Response) => {
  let responses = await TMOS.getTeam(req.query);
  res.status(200).send(responses);
});

teams.post("/", async (req: Request, res: Response) => {
  let newTeam = await TMOS.createTeam(req.body);
  if (!newTeam) {
    res.status(400).send("Invalid Inputs");
  } else {
    res.status(200).send(newTeam);
  }
});

teams.put("/add/member", async (req: Request, res: Response) => {
  let newM = await TMOS.addMembersToTeam(req.body);
  if (!newM) {
    res.status(400).send("Invalid Inputs");
  } else {
    res.status(200).send(newM);
  }
});

teams.put("/remove/member", async (req: Request, res: Response) => {
  let newM = await TMOS.removeMembersToTeam(req.body);
  if (!newM) {
    res.status(400).send("Invalid Inputs");
  } else {
    res.status(200).send(newM);
  }
});
