import { Prisma, PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { auth } from "../common/type";
const prisma = new PrismaClient();
import "dotenv/config";

//console.log("env::::::", process.env);

export const token = async (input: auth) => {
  let user = await prisma.user.findUnique({
    where: {
      Email: input.Email,
    },
  });
  // console.log("u::::::", user);
  if (user?.Password === input.Password) {
    const token = jwt.sign(input, process.env.SECRET_KEY as string, {
      expiresIn: "1h",
    });
    console.log(token);
    return token;
  } else {
    throw new Error("User Not Found");
  }
};
