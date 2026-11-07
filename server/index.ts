import express from "express";
import { getAllCards, createCard, deleteCard } from "./services/cards.service.ts";

const app = express();
const PORT = 3001;

app.use(express.json());

app.get("/cards", async (req, res) => {
  const cards = await getAllCards();
  res.json(cards);
});

app.post("/cards", async (req, res) => {
  const title = req.body?.title;
  if (typeof title !== "string" || title.trim() === "") {
    res.status(400).json({ error: "Название карточки не может быть пустым" });
    return;
  }
  const card = await createCard(title);
  res.status(201).json(card);
});

app.delete("/cards/:id", async (req, res) => {
  const deleted = await deleteCard(req.params.id);
  if (!deleted) {
    res.status(404).json({ error: "Карточка не найдена" });
    return;
  }
  res.status(204).send();
});

app.use((req, res) => {
  res.status(404).json({ error: "Маршрут не найден" });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
