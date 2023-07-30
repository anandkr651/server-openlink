import express, { json } from "express";
import userRouter from "./routes/user/user.router.js";
import PublicRiuter from "./routes/public.router.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/", userRouter);
app.use("/", PublicRiuter);

export { app };
