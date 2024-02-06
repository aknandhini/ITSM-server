import { Prisma, PrismaClient } from "@prisma/client";
import * as R from "ramda";
import { z, ZodError } from "zod";
import { PostData, PutData, Param, page } from "../common/type";
import {
  ticketSchema,
  searchSchema,
  paginationSchema,
} from "../common/input-validation";
import { getTicketsByEmailAndStatus, pagination } from "../common/utils";
const prisma = new PrismaClient();

export const getTickets = async (input: page) => {
  let query = paginationSchema.parse(input);
  let page = pagination(query);
  let tickets = await prisma.tickets.findMany({
    skip: (page - 1) * 10,
    take: 10,
  });
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
    let data = ticketSchema.parse(input);
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
    let data = ticketSchema.parse(bodyData);
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
export const searchTicket = async (input: Param) => {
  let squery = searchSchema.parse(input);
  try {
    const filtered_tickets = await getTicketsByEmailAndStatus(squery);
    return filtered_tickets;
  } catch (err) {
    console.log("er::::", err);
    if (err instanceof ZodError) {
      return "Invalid Input";
    }
    throw err;
  }
};
