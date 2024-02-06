import { PrismaClient } from "@prisma/client";
import { QueryInputs, page } from "./type";
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

export const pagination = (input: page) => {
  if (input.pageNumber && input.pageNumber == "1") {
    return parseInt(input.pageNumber);
  } else {
    let number = input.pageNumber ? parseInt(input.pageNumber) : 0;
    return number;
  }
};
