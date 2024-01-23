import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";
import * as R from "ramda";
import { z, ZodError } from "zod";
import { PostData, PutData, UserInput } from "../common/type";
const prisma = new PrismaClient();
import { userSchema } from "../common/input-validation";
//const app = express();
//app.use(express.json());

export const getUsers = async () => {
  let users = await prisma.user.findMany();
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
