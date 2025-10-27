import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { errorHandler } from "./src/utils/middleware";
import router from "./src/routes";
import { swaggerDocs } from "./src/swagger";
import cors from "cors";
import { verifyTransporter } from "./src/utils/email";
import path from "path";

const app = express();
dotenv.config();
verifyTransporter(); // check email setup on startup
const port = process.env.PORT;

app.use(
  cors({
    origin: [
      "https://siwes-finder-ten.vercel.app",
      "https://siwesfinderr.vercel.app",
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
  res.type("text").send("🚀 Siwes Finder API is running");
});

app.use("/api/v1", router);
// ✅ Serve static files (important!)
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(errorHandler);
// Swagger Docs
swaggerDocs(app, Number(port));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
