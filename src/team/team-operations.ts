import { Prisma, PrismaClient } from "@prisma/client";
import * as R from "ramda";
import { z, ZodError } from "zod";
import {
  AddMembers,
  CreateTeam,
  CreateTeamOp,
  DbError,
  Success,
  UniqueConstraineErr,
  page,
} from "../common/type";
import {
  AddUsertoTeam,
  CreateTeamSchema,
  paginationSchema,
} from "../common/input-validation";
import { pagination } from "../common/utils";
const prisma = new PrismaClient();
import { Result } from "@badrap/result";
import { CustomError } from "ts-custom-error";

export const createTeam = async (input: CreateTeam): CreateTeamOp => {
  try {
    let data = CreateTeamSchema.parse(input);
    const newTeam = await prisma.team.create({
      data: { ...data },
    });
    return Result.ok({ message: "Team Created", data: newTeam });
  } catch (err) {
    console.log("e:::", err);
    if (err instanceof ZodError) {
      return Result.err(err);
    } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return Result.err(
          new UniqueConstraineErr("Provided Email ID is already exixts in Team")
        );
      }
    }
    return Result.err(new DbError("Unknown DbError"));
  }
};

export const getTeam = async (input: page) => {
  let query = paginationSchema.parse(input);
  let page = pagination(query.pageNumber);
  let teams = await prisma.team.findMany({
    include: {
      User: true,
    },
    skip: (page - 1) * 10,
    take: 10,
  });
  return Result.ok({ data: teams });
};

export const addMembersToTeam = async (input: AddMembers) => {
  try {
    let data = await AddUsertoTeam.parseAsync(input);
    console.log("ddd", data);

    const member = await prisma.team.update({
      where: { Id: data.TeamId },
      data: {
        User: { connect: { Email: data.UserEmail } },
      },
    });
    let users = await prisma.user.findUnique({
      where: { Email: data.UserEmail },
    });

    let output = {
      message: "Member Added",
      data: { ...member, member: users },
    };
    return output;
  } catch (err: any) {
    console.log("e:::", err);
    if (err instanceof ZodError) {
      return { type: "ZodError", error: err };
    } else {
      return { type: "unknown" };
    }
  }
};

export const removeMembersToTeam = async (input: AddMembers) => {
  try {
    let data = AddUsertoTeam.parse(input);
    const member = await prisma.team.update({
      where: { Id: data.TeamId },
      data: {
        User: { disconnect: { Email: data.UserEmail } },
      },
    });
    const userDetail = await prisma.user.findUnique({
      where: { Email: data.UserEmail },
    });
    let output = { message: "Member Removed", data: userDetail };
    return output;
  } catch (err) {
    console.log("e:::", err);
    if (err instanceof ZodError) {
      return "Invalid Input";
    } else {
      throw new Error("User not removed");
    }
  }
};
