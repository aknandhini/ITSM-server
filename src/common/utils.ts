import { PrismaClient } from "@prisma/client";
import { QueryInputs } from "./type";
const prisma = new PrismaClient();

export const getTicketsByEmailAndStatus = async (parameter: QueryInputs) => {
  //console.log("quer::::", parameter);
  if (parameter.Email && parameter.Status) {
    const ticket = await prisma.tickets.findMany({
      where: {
        Status: {
          equals: `${parameter.Status}`,
        },
        Assigned_user: {
          is: {
            Email: `${parameter.Email}`,
          },
        },
      },
    });
    return ticket;
  } else if (!parameter.Email && parameter.Status) {
    const ticket = await prisma.tickets.findMany({
      where: {
        Status: {
          equals: `${parameter.Status}`,
        },
      },
    });
    return ticket;
  } else if (parameter.Email && !parameter.Status) {
    const ticket = await prisma.tickets.findMany({
      where: {
        Assigned_user: {
          is: {
            Email: `${parameter.Email}`,
          },
        },
      },
    });
    return ticket;
  } else if (!parameter.Email && !parameter.Status) {
    const tickets = await prisma.tickets.findMany();
    return tickets;
  }
};
