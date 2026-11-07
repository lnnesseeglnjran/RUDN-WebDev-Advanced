import type { Request, Response } from "express";
import { getAllCards, createCard, deleteCard, updateCardDone } from "../services/cards.service.ts";

export async function getCards(req: Request, res: Response): Promise<void> {
  const cards = await getAllCards();
  res.json(cards);
}

export async function createCardHandler(req: Request, res: Response): Promise<void> {
  const card = await createCard(req.body.title);
  res.status(201).json(card);
}

export async function deleteCardHandler(req: Request, res: Response): Promise<void> {
  const deleted = await deleteCard(req.params.id);
  if (!deleted) {
    res.status(404).json({ error: "Карточка не найдена" });
    return;
  }
  res.status(204).send();
}

export async function updateCardDoneHandler(req: Request, res: Response): Promise<void> {
  const updated = await updateCardDone(req.params.id, req.body.isDone);
  if (!updated) {
    res.status(404).json({ error: "Карточка не найдена" });
    return;
  }
  const cards = await getAllCards();
  const card = cards.find(c => c.id === req.params.id);
  res.status(200).json(card);
}
