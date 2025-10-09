import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import { clerkMiddleware, getAuth } from "@clerk/express";
import { shouldBeUser } from "./middleware/middleware.js";
import routes from "./routes";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);
app.use(morgan("dev"));

app.use(clerkMiddleware());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.use("/api", routes)

app.get("/test", shouldBeUser, (req: Request, res: Response) => {
  res.json({
    message: "Product service is authenticated.",
    userId: req.userId,
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  return res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error!" });
});

app.listen(8080, () => {
  console.log("Product service is running on port 8080.");
});
