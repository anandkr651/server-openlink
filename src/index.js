import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config();

const startSurver = () => {
  app.listen(process.env.PORT, () => {
    console.log(`app is running on PORT: ${process.env.PORT}`);
  });
};

try {
  await connectDB();
  startSurver();
} catch (error) {
  console.log(error);
}
