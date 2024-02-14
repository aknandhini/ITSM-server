import { strict } from "assert";
import { z, ZodError } from "zod";

export const userSchema = z.object({
  Email: z.string(),
  Name: z.string(),
  Password: z.string(),
});

const Svalues = ["Open", "progress", "Hold", "Closed"] as const;
const Pvalues = ["Low", "Medium", "High"] as const;
const Tvalues = ["Ticket", "Problem", "Question"] as const;

export const ticketSchema = z.object({
  Description: z.string().optional(),
  Subject: z.string(),
  Status: z.enum(Svalues).optional(),
  Priority: z.enum(Pvalues).optional(),
  Type: z.enum(Tvalues).optional(),
  Notes: z.string().optional(),
  Assigned_to: z.string().email(),
});

export const searchSchema = z.object({
  Status: z.enum(Svalues).optional(),
  Email: z.string().email().optional(),
});

export const paginationSchema = z.object({
  pageNumber: z.string().optional().default("1"),
});

export const TicketQuerySchema = z.object({
  pageNumber: z.string().optional().default("1"),
  Status: z.enum(Svalues).optional(),
  Priority: z.enum(Pvalues).optional(),
  Type: z.enum(Tvalues).optional(),
  Email: z.string().email().optional(),
});
