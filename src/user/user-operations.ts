import { Prisma, PrismaClient } from "@prisma/client";
import { z, ZodError } from "zod";
import { UserInput, page } from "../common/type";
const prisma = new PrismaClient();
import { paginationSchema, userSchema } from "../common/input-validation";
import { pagination } from "../common/utils";

export const getUsers = async (input: page) => {
  let query = paginationSchema.parse(input);
  let page = pagination(query.pageNumber);
  let users = await prisma.user.findMany({
    skip: (page - 1) * 10,
    take: 10,
  });
  return users;
};
export const createUser = async (input: UserInput) => {
  try {
    let data = userSchema.parse(input);
    const newUser = await prisma.user.create({
      data: {
        ...data,
      },
    });
    return newUser;
  } catch (err) {
    console.log("e:::", err);
    if (err instanceof ZodError) {
      return "Invalid Input";
    } else {
      throw err;
    }
  }
};
