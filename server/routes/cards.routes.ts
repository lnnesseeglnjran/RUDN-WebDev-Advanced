import { Router } from "express";
import { getCards, createCardHandler, deleteCardHandler, updateCardDoneHandler } from "../controllers/cards.controller.ts";
import { validateNewCard } from "../middleware/validateNewCard.ts";
import { validateDoneToggle } from "../middleware/validateDoneToggle.ts";

const router = Router();

router.get("/", getCards);
router.post("/", validateNewCard, createCardHandler);
router.delete("/:id", deleteCardHandler);
router.patch("/:id", validateDoneToggle, updateCardDoneHandler);

export const cardsRouter = router;
