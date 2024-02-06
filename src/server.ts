import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(); // {log: ["query"]}
import express, { NextFunction, Request, Response } from "express";
const app = express();
app.use(express.json());
import { authorization } from "./authentication/validation";
import { tickets } from "./ticket/ticket-route";
import { users } from "./user/user-route";
import { authentication } from "./authentication/auth-route";

app.use("/", authentication);

app.use(authorization());

app.use("/tickets", tickets);

app.use("/users", users);

app.listen(4000, () => {
  console.log("I am running on 4000");
});

// app.get("/api/v2/token", async (req, res) => {
//   //console.log("token api");
//   const payload = {
//     Email: `${req.body.Email}`,
//     Password: `${req.body.Password}`,
//   };
//   let user = await prisma.user.findUnique({
//     where: {
//       Email: payload.Email,
//     },
//   });
//   //console.log(user);
//   if (user?.Password === payload.Password) {
//     const token = jwt.sign(payload, secret.key, {
//       expiresIn: "1h",
//     });
//     //console.log(token);
//     res.send(token);
//   } else {
//     res.status(401).send("user not found");
//   }
// });
// type EmailMandatory = {
//   Email: string;
//   Status?: "Open" | "progress" | "Hold" | "Closed";
// };

// type StatusMandatory = {
//   Email?: string;
//   Status: "Open" | "progress" | "Hold" | "Closed";
// };

// type EmailAndStatusMandatory = {
//   Email: string;
//   Status: "Open" | "progress" | "Hold" | "Closed";
// };

// type NoMandatory = {
//   Email?: string;
//   Status?: "Open" | "progress" | "Hold" | "Closed";
// };

// type QueryInputs =
//   | EmailMandatory
//   | StatusMandatory
//   | EmailAndStatusMandatory
//   | NoMandatory;

// app.get("/api/v2/tickets", async (req, res) => {
//   const tickets = await prisma.tickets.findMany();
//   //console.log(tickets);
//   res.send(tickets);
// });

// app.get("/api/v2/tickets/:id", async (req, res) => {
//   try {
//     const ticket = await prisma.tickets.findUnique({
//       where: {
//         Id: parseInt(`${req.params.id}`),
//       },
//     });
//     if (!ticket) {
//       res.sendStatus(404); // [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
//     } else {
//       res.send(ticket);
//     }
//   } catch (err) {
//     console.log("errr::::", err);
//     if (err as PaymentValidationErrors) {
//       // PrismaClientValidationError
//       res.sendStatus(404);
//     }
//   }
// });

// app.post("/api/v2/tickets", async (req, res) => {
//   try {
//     const Svalues = ["Open", "progress", "Hold", "Closed"] as const;
//     const Pvalues = ["Low", "Medium", "High"] as const;
//     const Tvalues = ["Ticket", "Problem", "Question"] as const;
//     let body = z.object({
//       Description: z.string().optional(),
//       Subject: z.string(),
//       Status: z.enum(Svalues).optional(),
//       Priority: z.enum(Pvalues).optional(),
//       Type: z.enum(Tvalues).optional(),
//       Notes: z.string().optional(),
//       Assigned_to: z.string().email(),
//     });
//     let data = body.parse(req.body);
//     let body_data = R.omit(["Assigned_to"], data);
//     const newTicket = await prisma.tickets.create({
//       data: {
//         ...body_data,
//         Assigned_user: {
//           connect: {
//             Email: data.Assigned_to,
//           },
//         },
//       },
//     });
//     //console.log(newTicket);
//     res.send(newTicket);
//   } catch (err) {
//     console.log("e:::", err);
//     if (err instanceof ZodError) {
//       res.sendStatus(400);
//     } else {
//       res.sendStatus(500);
//     }
//   }
// });

// app.delete("/api/v2/tickets/:id", async (req, res) => {
//   const ticketDel = await prisma.tickets.delete({
//     where: {
//       Id: parseInt(`${req.params.id}`),
//     },
//   });
//   res.sendStatus(200);
// });

// app.put("/api/v2/tickets/:id", async (req, res) => {
//   try {
//     const Svalues = ["Open", "progress", "Hold", "Closed"] as const;
//     const Pvalues = ["Low", "Medium", "High"] as const;
//     const Tvalues = ["Ticket", "Problem", "Question"] as const;
//     let body = z.object({
//       Description: z.string().optional(),
//       Subject: z.string().optional(),
//       Status: z.enum(Svalues).optional(),
//       Priority: z.enum(Pvalues).optional(),
//       Type: z.enum(Tvalues).optional(),
//       Notes: z.string().optional(),
//       Assigned_to: z.string().email().optional(),
//     });
//     let data = body.parse(req.body);
//     let update_body = R.omit(["Assigned_to"], data);
//     let updatedTicket = await prisma.tickets.update({
//       where: { Id: parseInt(`${req.params.id}`) },
//       data: {
//         ...update_body,
//         Assigned_user: data.Assigned_to
//           ? {
//               connect: {
//                 Email: data.Assigned_to,
//               },
//             }
//           : undefined,
//       },
//     });
//     res.send(updatedTicket);
//   } catch (err) {
//     console.log("er::::", err);
//     if (err instanceof ZodError) {
//       res.sendStatus(400);
//     } else {
//       res.sendStatus(500);
//     }
//   }
// });

// const getTicketsByEmailAndStatus = async (parameter: QueryInputs) => {
//   //console.log("quer::::", parameter);
//   if (parameter.Email && parameter.Status) {
//     const ticket = await prisma.tickets.findMany({
//       where: {
//         Status: {
//           equals: `${parameter.Status}`,
//         },
//         Assigned_user: {
//           is: {
//             Email: `${parameter.Email}`,
//           },
//         },
//       },
//     });
//     return ticket;
//   } else if (!parameter.Email && parameter.Status) {
//     const ticket = await prisma.tickets.findMany({
//       where: {
//         Status: {
//           equals: `${parameter.Status}`,
//         },
//       },
//     });
//     return ticket;
//   } else if (parameter.Email && !parameter.Status) {
//     const ticket = await prisma.tickets.findMany({
//       where: {
//         Assigned_user: {
//           is: {
//             Email: `${parameter.Email}`,
//           },
//         },
//       },
//     });
//     return ticket;
//   } else if (!parameter.Email && !parameter.Status) {
//     const tickets = await prisma.tickets.findMany();
//     return tickets;
//   }
// };

// app.get("/api/v2/search", async (req, res) => {
//   const Svalues = ["Open", "progress", "Hold", "Closed"] as const;
//   let queryparam = z.object({
//     Status: z.enum(Svalues).optional(),
//     Email: z.string().email().optional(),
//   });
//   let squery = queryparam.parse(req.query);
//   try {
//     const filtered_tickets = await getTicketsByEmailAndStatus(squery);
//     res.send(filtered_tickets);
//   } catch (err) {
//     console.log("er::::", err);
//   }
// });

// app.get("/api/v2/users", async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.send(users);
// });

// app.post("/api/v2/users", async (req, res) => {
//   try {
//     let body = z.object({
//       Email: z.string(),
//       Name: z.string(),
//       Password: z.string(),
//     });
//     let data = body.parse(req.body);
//     const newUser = await prisma.user.create({
//       data: {
//         ...data,
//       },
//     });
//     //console.log(newTicket);
//     res.send(newUser);
//   } catch (err) {
//     console.log("e:::", err);
//     if (err instanceof ZodError) {
//       res.sendStatus(400);
//     } else {
//       res.sendStatus(500);
//     }
//   }
// });
