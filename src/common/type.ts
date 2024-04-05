import { $Enums } from "@prisma/client";
import { strict } from "assert";
import { number, string, z } from "zod";
import { Svalues } from "./input-validation";

export type PostData = {
  Description: string;
  Subject: string;
  Status: string;
  Priority: string;
  Type: string;
  Notes: string;
  Assigned_to: string;
};

export type PutData = {
  Description?: string;
  Subject?: string;
  Status?: string;
  Priority?: string;
  Type?: string;
  Notes?: string;
  Assigned_to?: string;
};

type EmailMandatory = {
  Email: string;
  Status?: "Open" | "progress" | "Hold" | "Closed";
};

type StatusMandatory = {
  Email?: string;
  Status: "Open" | "progress" | "Hold" | "Closed";
};

type EmailAndStatusMandatory = {
  Email: string;
  Status: "Open" | "progress" | "Hold" | "Closed";
};

type NoMandatory = {
  Email?: string;
  Status?: "Open" | "progress" | "Hold" | "Closed";
};

export type QueryInputs =
  | EmailMandatory
  | StatusMandatory
  | EmailAndStatusMandatory
  | NoMandatory;

export type Param = {
  Email?: string;
  Status?: string;
};

export type UserInput = {
  Email: string;
  Name: string;
  Password: string;
};

export type deleteUserIn = {
  Email: string;
};

export type auth = {
  Email: string;
  Password: string;
};

export type PageNumber = {
  pageNumber: string;
};

export type page = Partial<PageNumber>;

export type AllQuery = {
  pageNumber?: string;
  Status?: string;
  Priority?: string;
  Type?: string;
  Email?: string;
};
export type EmailQuery = {
  Assigned_user: {
    is: {
      Email: string;
    };
  };
};

const s = z.enum(Svalues);

export type StatusQuery = {
  Status: {
    equals: z.infer<typeof s>;
  };
};
export type PriorityQuery = {
  Priority: {
    equals: $Enums.ticket_table_2_Priority;
  };
};
export type TypeQuery = {
  Type: {
    equals: $Enums.ticket_table_2_Type;
  };
};

export type Pagination = {
  skip: number;
  take: number;
};
export type TicketWhereQuery = Partial<
  EmailQuery & StatusQuery & PriorityQuery & TypeQuery
>;

export type TicketQuery = { where: TicketWhereQuery } & Pagination;

export type CreateTeam = {
  Name: string;
  Email?: string;
};

export type AddMembers = {
  UserEmail: string;
  TeamId: number;
};
