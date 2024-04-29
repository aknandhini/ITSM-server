import express, { NextFunction, Request, Response } from "express";
import * as TMOS from "./team-operations";
import { ZodError } from "zod";
export const teams = express.Router();
import { Result } from "@badrap/result";
import { CreateTeamResponse } from "../common/type";
import { CustomError } from "ts-custom-error";

teams.get("/", async (req: Request, res: Response) => {
  let responses = await TMOS.getTeam(req.query);
  res.status(200).send(responses);
});

teams.post("/", async (req: Request, res: Response) => {
  try {
    let newTeam = await TMOS.createTeam(req.body);
    // if (newTeam.isOk) {
    //   res.status(200).send(newTeam);
    // } else if (newTeam.isErr) {
    //   res.status(400).send(newTeam);
    // }
    newTeam
      .chain<CreateTeamResponse, never>(
        (data) => Result.ok({ status: 200, data }),
        (err) => {
          console.log("ooo::", err);
          if (err instanceof ZodError) {
            return Result.ok({ status: 400, data: err });
          }
          return Result.ok({
            status: 500,
            data: { message: err.message },
          });
        }
      )
      .map((x) => res.status(x.status).send(x.data));
  } catch (err) {
    res.status(500).send(err);
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
