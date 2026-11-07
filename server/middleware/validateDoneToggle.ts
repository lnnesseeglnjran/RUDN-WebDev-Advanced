import type { Request, Response, NextFunction } from "express";

export function validateDoneToggle(req: Request, res: Response, next: NextFunction): void {
  const isDone = req.body?.isDone;
  if (typeof isDone !== "boolean") {
    res.status(400).json({ error: "Поле isDone должно быть булевым значением" });
    return;
  }
  next();
}
