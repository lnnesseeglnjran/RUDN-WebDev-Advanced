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
  const card = { id: randomUUID(), title, isDone: false, isUrgent: false };
  cards.push(card);
  res.status(201).json(card);
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});