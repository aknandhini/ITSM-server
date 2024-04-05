import { Prisma, PrismaClient } from "@prisma/client";
import * as R from "ramda";
import { unknown, z, ZodError } from "zod";
import { AddMembers, CreateTeam, page } from "../common/type";
import {
  AddUsertoTeam,
  CreateTeamSchema,
  paginationSchema,
} from "../common/input-validation";
import { hasValidEmail, pagination } from "../common/utils";
const prisma = new PrismaClient();

export const createTeam = async (input: CreateTeam) => {
  try {
    let data = CreateTeamSchema.parse(input);
    const newTeam = await prisma.team.create({
      data: { ...data },
    });
    return { message: "Team Created", data: newTeam };
  } catch (err) {
    console.log("e:::", err);
    if (err instanceof ZodError) {
      return "Invalid Input";
    } else {
      throw new Error("Team not Created");
    }
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
  return { data: teams };
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
      throw { type: "ZodError", error: err };
    } else {
      throw { type: "unknown" };
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
