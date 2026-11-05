import express from "express";

const app = express();
const PORT = 3001;

const cards = [
  { id: "1", title: "Спроектировать структуру доски", isDone: true, isUrgent: false },
  { id: "2", title: "Подключить доску к серверу", isDone: false, isUrgent: true },
  { id: "3", title: "Добавить фильтр выполненных карточек", isDone: false, isUrgent: false },
];

app.get("/cards", (req, res) => {
  res.json(cards);
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});