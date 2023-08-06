import express, { json } from "express";
import userRouter from "./routes/user/user.router.js";
import authRouter from "./routes/auth/auth.router.js";
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
    // methods: "GET POST",
  })
);

app.use("/api", userRouter);
app.use("/auth", authRouter);
app.use("/", PublicRiuter);

app.get("/api/test", (req, res) => {
  res.send("<h1>working</h1>");
});
export { app };
