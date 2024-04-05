import express, { NextFunction, Request, Response } from "express";
import * as TMOS from "./team-operations";
import { ZodError } from "zod";
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
  try {
    let newM = await TMOS.addMembersToTeam(req.body);
    console.log("mmmm", newM);
    res.status(200).send(newM);
  } catch (err: any) {
    if (err.type === "ZodError") {
      //   DB error handle pananum
      res.status(400).send(err.error);
    } else {
      res.status(500).send({ code: 500, message: "Something Went Wrong" });
    }
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
