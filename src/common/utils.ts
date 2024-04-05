import { PrismaClient } from "@prisma/client";
import {
  AllQuery,
  QueryInputs,
  TicketQuery,
  TicketWhereQuery,
  page,
} from "./type";
import * as R from "ramda";
import { z } from "zod";
import { TicketQuerySchema } from "./input-validation";
const prisma = new PrismaClient();

export const pagination = (pageNumber: string) => {
  if (pageNumber && pageNumber == "1") {
    return parseInt(pageNumber);
  } else {
    let number = pageNumber ? parseInt(pageNumber) : 0;
    return number;
  }
};

const validEmailFormat =
  /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/;

export const hasValidEmail = (email: string) => validEmailFormat.test(email);

export const searchTicketQuery = (
  input: z.infer<typeof TicketQuerySchema>
): TicketQuery => {
  let query: TicketWhereQuery = {};
  if (input.Email) {
    query.Assigned_user = {
      is: {
        Email: input.Email,
      },
    };
  }
  if (input.Status) {
    query.Status = {
      equals: input.Status,
    };
  }
  if (input.Priority) {
    query.Priority = {
      equals: input.Priority,
    };
  }
  if (input.Type) {
    query.Type = {
      equals: input.Type,
    };
  }
  let page = pagination(input.pageNumber);
  return {
    where: query,
    skip: (page - 1) * 10,
    take: 10,
  };
};

export const isTeamIdExist = async (teamId: number) => {
  let result = await prisma.team.findUnique({
    where: { Id: teamId },
  });
  return result !== null;
};

export const isUserExist = async (user: string) => {
  let result = await prisma.user.findUnique({
    where: { Email: `${user}` },
  });
  return result !== null;
};
