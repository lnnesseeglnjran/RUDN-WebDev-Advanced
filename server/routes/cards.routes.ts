import { Router } from "express";
import { getCards, createCardHandler, deleteCardHandler } from "../controllers/cards.controller.ts";
import { validateNewCard } from "../middleware/validateNewCard.ts";

const router = Router();

router.get("/", getCards);
router.post("/", validateNewCard, createCardHandler);
router.delete("/:id", deleteCardHandler);

export const cardsRouter = router;
