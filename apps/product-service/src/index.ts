import express, { Request, Response } from "express";
import cors from "cors";

import { clerkMiddleware, getAuth } from "@clerk/express";
import { shouldBeUser } from "./middleware/middleware.js";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);

app.use(clerkMiddleware());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.get("/test", shouldBeUser, (req: Request, res: Response) => {
  res.json({ message: "Product service is authenticated." , userId: req.userId});
});

app.listen(8080, () => {
  console.log("Product service is running on port 8080.");
});
