import express, { NextFunction, Request, Response } from "express";
import * as TOS from "./ticket-operations";
export const tickets = express.Router();

tickets.get("/", async (req: Request, res: Response) => {
  let responses = await TOS.getTickets(req.query);
  res.status(200).send(responses);
});

tickets.get("/search", async (req: Request, res: Response) => {
  let ticket = await TOS.searchTicket(req.query);
  if (!ticket) {
    res.status(400).send("Ticket not found");
  } else {
    res.status(200).send(ticket);
  }
});

tickets.get("/:id", async (req: Request, res: Response) => {
  //console.log("par::::", req.params.id);
  let ticket = await TOS.getTicketById(`${req.params.id}`);
  if (!ticket) {
    res.status(404).send("Ticket not Found");
  } else {
    res.status(200).send(ticket);
  }
});

tickets.post("/", async (req: Request, res: Response) => {
  let newT = await TOS.createTicket(req.body);
  if (!newT) {
    res.status(400).send("Invalid Inputs");
  } else {
    res.status(200).send(newT);
  }
});
tickets.delete("/:id", async (req: Request, res: Response) => {
  let deletedT = await TOS.deleteTicket(`${req.params.id}`);
  res.status(200).send(deletedT);
});
tickets.put("/:id", async (req: Request, res: Response) => {
  let updatedT = await TOS.updateTicket(req.params.id, req.body);
  if (!updatedT) {
    res.status(400).send("Invalid Inputs");
  } else {
    res.status(200).send(updatedT);
  }
});
