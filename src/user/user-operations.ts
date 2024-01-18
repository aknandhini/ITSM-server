import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";
import * as R from "ramda";
import { z, ZodError } from "zod";
import { PostData, PutData } from "../common/type";
const prisma = new PrismaClient();
//const app = express();
//app.use(express.json());

export const getUsers = async () => {
  let users = await prisma.user.findMany();
  return users;
};
