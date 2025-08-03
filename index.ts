import dotenv from "dotenv";
import express, { Request, Response } from "express";

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json("Hello World !!!");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
