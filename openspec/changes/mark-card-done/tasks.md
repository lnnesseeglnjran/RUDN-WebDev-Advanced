## 1. Сервис

- [x] 1.1 Добавить `updateCardDone(id: string, isDone: boolean): Promise<boolean>` в `server/services/cards.service.ts`: найти карточку по `id` через `findIndex`, если не найдена вернуть `false`, если найдена — переключить `isDone`, вернуть `true`. Убедиться что в файле нет `req`, `res`, `status`

## 2. Контроллер

- [x] 2.1 Добавить `updateCardDoneHandler(req: Request, res: Response): Promise<void>` в `server/controllers/cards.controller.ts`: вызвать `await updateCardDone(req.params.id, req.body.isDone)`, если `false` — 404 JSON, если `true` — 200 JSON с обновлённой карточкой

## 3. Middleware

- [x] 3.1 Создать `server/middleware/validateDoneToggle.ts`: проверить `typeof req.body.isDone === "boolean"`, если не булево — 400 JSON, иначе `next()`

## 4. Роутер

- [ ] 4.1 Добавить `router.patch("/:id", validateDoneToggle, updateCardDoneHandler)` в `server/routes/cards.routes.ts`, импортировать `validateDoneToggle` и `updateCardDoneHandler`

## 5. API клиент

- [ ] 5.1 Добавить `toggleCardDone(id: string, isDone: boolean): Promise<Card>` в `client/src/api/cards.ts`: `fetch PATCH /api/cards/:id` с телом `{ isDone }`, проверить `response.ok`, вернуть `response.json()`

## 6. App: мутация и проброс коллбека

- [ ] 6.1 Добавить `useQueryClient` и `useMutation({ mutationFn: toggleCardDone, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cards"] }) })` в `client/src/App.tsx`, создать `handleToggle(id, isDone)` и пробросить в `BoardColumn`

## 7. BoardColumn: проброс id и onToggle

- [ ] 7.1 Добавить `onToggle` в props `BoardColumn`, передать `card.id` и `onToggle` в `BoardCard` при рендере

## 8. BoardCard: элемент управления

- [ ] 8.1 Добавить props `id: string` и `onToggle: (id: string, isDone: boolean) => void` в `BoardCard`, добавить чекбокс `<input type="checkbox" checked={isDone} onChange={e => onToggle(id, e.target.checked)} />` в шаблон, стилизовать чекбокс в `BoardCard.module.css`

## 9. Верификация

- [ ] 9.1 Выполнить `openspec validate --changes mark-card-done`, валидация проходит

- [ ] 9.2 Проверка в браузере по всем сценариям спеки:
  - Чекбокс виден на каждой карточке
  - Установка отметки — карточка приглушается и зачёркивается
  - Снятие отметки — карточка становится обычной
  - Отметка сохраняется после F5
  - Сервер принимает PATCH /cards/:id
  - Небулево значение в запросе → 400
  - Несуществующий id → 404
