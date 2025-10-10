import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";

import { CustomJwtSessionClaims } from "@repo/types";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const shouldBeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = getAuth(req);
  const userId = auth.userId;
  if (!userId) {
    return res.status(401).json({ message: "You are not logged in." });
  }

  req.userId = auth.userId;

  return next();
};

export const shouldBeAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = getAuth(req);
  if (!auth.userId) {
    return res.status(401).json({ message: "You are not logged in." });
  }

  const claims = auth.sessionClaims as CustomJwtSessionClaims;

  if (claims.metadata?.role !== "admin") {
    return res.status(403).json({ message: "You are not authorized." });
  }

  req.userId = auth.userId;

  return next();
};
