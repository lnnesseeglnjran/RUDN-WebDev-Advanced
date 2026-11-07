import { randomUUID } from "node:crypto";
import type { Card } from "../types/card.ts";

const cards: Card[] = [
  { id: "1", title: "Спроектировать структуру доски", isDone: true, isUrgent: false },
  { id: "2", title: "Подключить доску к серверу", isDone: false, isUrgent: true },
  { id: "3", title: "Добавить фильтр выполненных карточек", isDone: false, isUrgent: false },
];

export async function getAllCards(): Promise<Card[]> {
  return cards;
}

export async function createCard(title: string): Promise<Card> {
  const card: Card = { id: randomUUID(), title: title.trim(), isDone: false, isUrgent: false };
  cards.push(card);
  return card;
}

export async function deleteCard(id: string): Promise<boolean> {
  const index = cards.findIndex(c => c.id === id);
  if (index === -1) return false;
  cards.splice(index, 1);
  return true;
}

export async function updateCardDone(id: string, isDone: boolean): Promise<boolean> {
  const index = cards.findIndex(c => c.id === id);
  if (index === -1) return false;
  cards[index].isDone = isDone;
  return true;
}
