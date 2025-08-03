import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { errorHandler } from "./src/utils/middleware";

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json("Hello World !!!");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
