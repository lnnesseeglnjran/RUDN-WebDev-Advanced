# Отчёт о работе с агентом: mark-card-done

**Ветка:** feature/mark-card-done · **Коммитов:** 4 (без коммитов самого отчёта и архивации) · **Период:** 2026-11-07 — 2026-11-08

| Шаг | Что сделал агент | Что я правил руками и почему |
| --- | --- | --- |
| 1.1 | Добавил `updateCardDone(id, isDone)` в `server/services/cards.service.ts`: `findIndex` + переключение `isDone`, возвращает `true`/`false` | — |
| 2.1 | Добавил `updateCardDoneHandler` в `server/controllers/cards.controller.ts`: вызывает сервис, 404 JSON если `false`, 200 JSON если `true` | — |
| 3.1 | Создал `server/middleware/validateDoneToggle.ts`: проверяет `typeof req.body.isDone === "boolean"`, иначе 400 JSON | — |
| 4.1 | Добавил `router.patch("/:id", validateDoneToggle, updateCardDoneHandler)` в `server/routes/cards.routes.ts` | — |
| 5.1 | Добавил `toggleCardDone(id, isDone)` в `client/src/api/cards.ts`: PATCH `/api/cards/:id` с телом `{ isDone }` | — |
| 6.1 | Добавил `useMutation` для `toggleCardDone` в `client/src/App.tsx`, создал `handleToggle`, пробросил в `BoardColumn` | Исправила ошибку в `mutationFn`: агент передал объект `{ id, isDone }` вместо пары аргументов, сервер возвращал 400. Поменяла `mutationFn` на правильный распаковщик. |
| 7.1 | Добавил `onToggle` в props `BoardColumn`, передал `card.id` и `onToggle` в `BoardCard` | — |
| 8.1 | Добавил props `id` и `onToggle` в `BoardCard`, добавил чекбокс `<input type="checkbox">`, стилизовал в CSS | — |
| 9.1 | Запустил `openspec validate --changes mark-card-done`, валидация прошла | — |
| 9.2 | — | Проверка в браузере: чекбокс виден, установка/снятие работает, сохраняется после F5, 400 и 404 возвращаются корректно |

## Проверки в браузере

Все проверки пройдены вручную:
- Чекбокс виден на каждой карточке
- Установка отметки — карточка приглушается и зачёркивается
- Снятие отметки — карточка становится обычной
- Отметка сохраняется после F5
- Сервер принимает PATCH /cards/:id
- Небулево значение → 400
- Несуществующий id → 404

## Что осталось незакрытым

Всё закрыто.
