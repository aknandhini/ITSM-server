import { Prisma, PrismaClient } from "@prisma/client";
import * as R from "ramda";
import { z, ZodError } from "zod";
import { AddMembers, CreateTeam, page } from "../common/type";
import {
  AddUsertoTeam,
  CreateTeamSchema,
  paginationSchema,
} from "../common/input-validation";
import { pagination } from "../common/utils";
const prisma = new PrismaClient();

export const createTeam = async (input: CreateTeam) => {
  try {
    let data = CreateTeamSchema.parse(input);
    const newTeam = await prisma.team.create({
      data: { ...data },
    });
    return newTeam;
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
    skip: (page - 1) * 10,
    take: 10,
  });
  return teams;
};

export const addMembersToTeam = async (input: AddMembers) => {
  try {
    let data = AddUsertoTeam.parse(input);
    const member = await prisma.team.update({
      where: { Id: data.TeamId },
      data: {
        User: { connect: { Id: data.UserId } },
      },
    });
    const userDetail = await prisma.user.findUnique({
      where: { Id: data.UserId },
    });
    let output = { ...member, member: userDetail };
    return output;
  } catch (err) {
    console.log("e:::", err);
    if (err instanceof ZodError) {
      return "Invalid Input";
    } else {
      throw new Error("User not Added");
    }
  }
};

export const removeMembersToTeam = async (input: AddMembers) => {
  try {
    let data = AddUsertoTeam.parse(input);
    const member = await prisma.team.update({
      where: { Id: data.TeamId },
      data: {
        User: { disconnect: { Id: data.UserId } },
      },
    });
    const userDetail = await prisma.user.findUnique({
      where: { Id: data.UserId },
    });
    let output = { ...userDetail };
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
