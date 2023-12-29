"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { strict } from "assert";
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const promise_1 = __importDefault(require("mysql2/promise"));
const zod_1 = require("zod");
app.use(express_1.default.json());
const pool = promise_1.default.createPool({
    host: "localhost",
    user: "root",
    database: "ticketing_system",
    password: "Summa@123",
    waitForConnections: true,
    connectionLimit: 50,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});
function inserData(data) {
    return __awaiter(this, void 0, void 0, function* () {
        //console.log("pool", pool.getConnection());
        const [rows] = yield pool.execute("INSERT INTO ticket_table_2 (`Description`,`Subject`,`Status`,`Priority`,`Type`,`Notes`) VALUES (?,?,?,?,?,?)", [
            data.Description,
            data.Subject,
            data.Status,
            data.Priority,
            data.Type,
            data.Notes,
        ]);
        //console.log("kk", k);
        let id = rows.insertId;
        const [resp] = yield pool.execute("SELECT * FROM ticket_table_2 WHERE `id` = ?", [id]);
        return resp;
    });
}
app.get("/api/v2/tickets", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   res.json(JSON.parse(fs.readFileSync("tickets.json", "utf8")));
    //   res.sendStatus(200);
    const connection = yield promise_1.default.createConnection({
        host: "localhost",
        user: "root",
        database: "ticketing_system",
        password: "Summa@123",
    });
    const [rows] = yield connection.execute("SELECT * FROM ticket_table_2;");
    console.log("rows", rows);
    res.json(rows);
}));
app.get("/api/v2/tickets/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   let result = JSON.parse(fs.readFileSync("tickets.json", "utf8")).find(
    //     (ticket) => ticket.id == req.params.id
    //   );
    //   res.json(result);
    //   res.sendStatus(200);
    const connection = yield promise_1.default.createConnection({
        host: "localhost",
        user: "root",
        database: "ticketing_system",
        password: "Summa@123",
    });
    const [rows] = yield connection.execute("SELECT * FROM ticket_table_2 WHERE `id` = ?", [req.params.id]);
    if (!rows.length) {
        res.sendStatus(404);
    }
    res.json(rows);
}));
app.post("/api/v2/tickets", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Svalues = ["Open", "progress", "Hold", "Closed"];
        const Pvalues = ["Low", "Medium", "High"];
        const Tvalues = ["Ticket", "Problem", "Question"];
        const body = zod_1.z.object({
            Description: zod_1.z.string(),
            Subject: zod_1.z.string().min(1),
            Status: zod_1.z.enum(["Open", "progress", "Hold", "Closed"]),
            Priority: zod_1.z.enum(Pvalues),
            Type: zod_1.z.enum(Tvalues),
            Notes: zod_1.z.string(),
        });
        let data = body.parse(req.body);
        let response = yield inserData(data);
        //console.log("k", k);
        res.json(response);
    }
    catch (err) {
        console.log("errrrr:::::", JSON.stringify(err));
        if (err instanceof zod_1.z.ZodError) {
            //console.log(err.issues);
            res.status(400).send(err.message);
            return;
        }
        res.status(500).send("Something went wrong").end();
    }
}));
app.delete("/api/v2/tickets/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   let oldData = JSON.parse(fs.readFileSync("tickets.json", "utf8"));
    //   let index = oldData.findIndex((ticket) => ticket.id == req.params.id);
    //   if (index == -1) {
    //     res.sendStatus(404);
    //   }
    //   oldData.splice(index, 1);
    //   fs.writeFileSync("tickets.json", JSON.stringify(oldData));
    //   res.sendStatus(200);
    const connection = yield promise_1.default.createConnection({
        host: "localhost",
        user: "root",
        database: "ticketing_system",
        password: "Summa@123",
    });
    const [rows] = yield connection.execute("DELETE FROM ticket_table_2 WHERE `id` = ?", [req.params.id]);
    res.sendStatus(200);
}));
// app.put("/api/v2/tickets/:id", async (req, res) => {
//   //   let oldData = JSON.parse(fs.readFileSync("tickets.json", "utf8"));
//   //   let index = oldData.findIndex((ticket) => ticket.id == req.params.id);
//   //   if (index == -1) {
//   //     res.sendStatus(404);
//   //   }
//   //   oldData[index] = req.body;
//   //   fs.writeFileSync("tickets.json", JSON.stringify(oldData));
//   //   res.sendStatus(200);
//   const connection = await mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     database: "ticketing_system",
//     password: "Summa@123",
//   });
//   const [rows] = await connection.execute("", []);
//   res.json(rows);
// });
app.listen(3000, () => {
    console.log("I am running on 3000");
});
