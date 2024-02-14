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
