import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { errorHandler } from "./src/utils/middleware";
import router from "./src/routes";
import { swaggerDocs } from "./src/swagger";
import cors from "cors";

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(
  cors({
    origin: [
      "https://siwes-finder-ten.vercel.app",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json("Hello World !!!");
});

app.use("/api/v1", router);

app.use(errorHandler);
// Swagger Docs
swaggerDocs(app, Number(port));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
