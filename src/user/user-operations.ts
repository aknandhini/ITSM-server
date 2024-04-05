import { Prisma, PrismaClient } from "@prisma/client";
import { z, ZodError } from "zod";
import { UserInput, deleteUserIn, page } from "../common/type";
const prisma = new PrismaClient();
import {
  delUser,
  paginationSchema,
  userSchema,
} from "../common/input-validation";
import { pagination } from "../common/utils";

export const getUsers = async (input: page) => {
  let query = paginationSchema.parse(input);
  let page = pagination(query.pageNumber);
  let users = await prisma.user.findMany({
    include: {
      Teams: true,
    },
    skip: (page - 1) * 10,
    take: 10,
  });
  return { data: users };
};
export const createUser = async (input: UserInput) => {
  try {
    let data = userSchema.parse(input);
    const newUser = await prisma.user.create({
      data: {
        ...data,
      },
    });
    return { message: "User Created", data: newUser };
  } catch (err) {
    console.log("e:::", err);
    if (err instanceof ZodError) {
      return "Invalid Input";
    } else {
      throw err;
    }
  }
};

export const deleteUser = async (input: deleteUserIn) => {
  try {
    let data = delUser.parse(input);
    const user = await prisma.user.delete({
      where: {
        Email: `${data.Email}`,
      },
    });
    return { message: "User Deleted", data: user };
  } catch (err) {
    console.log("e:::", err);
    if (err instanceof ZodError) {
      return "Invalid Input";
    } else {
      throw err;
    }
  }
};
