import type { Request, Response, NextFunction } from "express";

export function validateNewCard(req: Request, res: Response, next: NextFunction): void {
  const title = req.body?.title;
  if (typeof title !== "string" || title.trim() === "") {
    res.status(400).json({ error: "Название карточки не может быть пустым" });
    return;
  }
  next();
}
