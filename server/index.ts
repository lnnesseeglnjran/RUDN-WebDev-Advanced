import express from "express";
import { randomUUID } from "node:crypto";

const app = express();
const PORT = 3001;

app.use(express.json());

const cards = [
  { id: "1", title: "Спроектировать структуру доски", isDone: true, isUrgent: false },
  { id: "2", title: "Подключить доску к серверу", isDone: false, isUrgent: true },
  { id: "3", title: "Добавить фильтр выполненных карточек", isDone: false, isUrgent: false },
];

app.get("/cards", (req, res) => {
  res.json(cards);
});

app.post("/cards", (req, res) => {
  const title = req.body?.title;
  if (typeof title !== "string" || title.trim() === "") {
    res.status(400).json({ error: "Название карточки не может быть пустым" });
    return;
  }
  const card = { id: randomUUID(), title: title.trim(), isDone: false, isUrgent: false };
  cards.push(card);
  res.status(201).json(card);
});

app.delete("/cards/:id", (req, res) => {
  const index = cards.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ error: "Карточка не найдена" });
    return;
  }
  cards.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});