import express from "express";
import { cardsRouter } from "./routes/cards.routes.ts";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use("/cards", cardsRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Маршрут не найден" });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
