import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";
import * as R from "ramda";
import { z, ZodError } from "zod";
import { PostData, PutData } from "../common/type";
const prisma = new PrismaClient();
//const app = express();
//app.use(express.json());

export const getTickets = async () => {
  let tickets = await prisma.tickets.findMany();
  return tickets;
};
export const getTicketById = async (id: string) => {
  try {
    //console.log("id:::;", id);
    const ticket = await prisma.tickets.findUnique({
      where: {
        Id: parseInt(`${id}`),
      },
    });
    return ticket;
  } catch (err) {
    console.log("errr::::", err);
    if (err as PaymentValidationErrors) {
      // PrismaClientValidationError
      throw new Error("Error by get ticket API");
    }
  }
};
export const createTicket = async (input: PostData) => {
  try {
    const Svalues = ["Open", "progress", "Hold", "Closed"] as const;
    const Pvalues = ["Low", "Medium", "High"] as const;
    const Tvalues = ["Ticket", "Problem", "Question"] as const;
    let body = z.object({
      Description: z.string().optional(),
      Subject: z.string(),
      Status: z.enum(Svalues).optional(),
      Priority: z.enum(Pvalues).optional(),
      Type: z.enum(Tvalues).optional(),
      Notes: z.string().optional(),
      Assigned_to: z.string().email(),
    });
    let data = body.parse(input);
    let body_data = R.omit(["Assigned_to"], data);
    const newTicket = await prisma.tickets.create({
      data: {
        ...body_data,
        Assigned_user: {
          connect: {
            Email: data.Assigned_to,
          },
        },
      },
    });
    //console.log(newTicket);
    return newTicket;
  } catch (err) {
    console.log("e:::", err);
    if (err instanceof ZodError) {
      return "Invalid Input";
    } else {
      throw new Error("Ticket not Created");
    }
  }
};
export const deleteTicket = async (id: string) => {
  const ticketDel = await prisma.tickets.delete({
    where: {
      Id: parseInt(`${id}`),
    },
  });
  return "ticket deleted";
};
export const updateTicket = async (id: string, bodyData: PutData) => {
  try {
    const Svalues = ["Open", "progress", "Hold", "Closed"] as const;
    const Pvalues = ["Low", "Medium", "High"] as const;
    const Tvalues = ["Ticket", "Problem", "Question"] as const;
    let body = z.object({
      Description: z.string().optional(),
      Subject: z.string().optional(),
      Status: z.enum(Svalues).optional(),
      Priority: z.enum(Pvalues).optional(),
      Type: z.enum(Tvalues).optional(),
      Notes: z.string().optional(),
      Assigned_to: z.string().email().optional(),
    });
    let data = body.parse(bodyData);
    //console.log("d:::::;", data);
    let update_body = R.omit(["Assigned_to"], data);
    let updatedTicket = await prisma.tickets.update({
      where: { Id: parseInt(`${id}`) },
      data: {
        ...update_body,
        Assigned_user: data.Assigned_to
          ? {
              connect: {
                Email: data.Assigned_to,
              },
            }
          : undefined,
      },
    });
    //console.log("re:::::", updatedTicket);
    return updatedTicket;
  } catch (err) {
    console.log("er::::", err);
    if (err instanceof ZodError) {
      return "Invalid Input";
    }
    throw err;
  }
};
