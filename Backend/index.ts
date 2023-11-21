const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

app.post("/api/users", (_req: any, res: any) => {});
