import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import boardRoutes from "./routes/board.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/boards", boardRoutes);

export default app;