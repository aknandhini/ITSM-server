import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// {
//   log: ["query"];
// }
import express, { NextFunction, Request, Response } from "express";
const app = express();
app.use(express.json());
import { authorization } from "./authentication/validation";
import { tickets } from "./ticket/ticket-route";
import { users } from "./user/user-route";
import { teams } from "./team/team-route";
import { authentication } from "./authentication/auth-route";
import { ZodError, z } from "zod";

app.use("/", authentication);

app.use(authorization());

app.use("/tickets", tickets);

app.use("/users", users);

app.use("/teams", teams);

app.listen(4000, () => {
  console.log("I am running on 4000");
});
