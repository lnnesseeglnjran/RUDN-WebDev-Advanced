## 1. Выбор метода и адреса

### PATCH /cards/:id vs PUT /cards/:id

**PUT** — замена ресурса целиком. Клиент должен отправить все поля карточки, даже те, что не менялись. Это избыточно для изменения одного поля.

**PATCH** — частичное обновление. Клиент отправляет только поле `isDone`, сервер обновляет его, остальные поля остаются без изменений. Это соответствует семантике тикета: «изменение затрагивает одно поле, а не всю карточку целиком».

**Выбранный вариант: PATCH** — клиент отправляет минимальный payload `{ isDone: true }`, сервер обновляет только это поле.

### Почему не POST

**POST** — создание нового ресурса. Изменение существующей карточки не является созданием. POST к `/cards/:id` — нестандартный паттерн, который путает разработчиков и не отражает REST-семантику.

### Адрес

Адрес `/cards/:id` — соответствует существующей иерархии: карточки живут по `/cards`, конкретная карточка — по `/cards/:id`.

## 2. Обновление кэша React Query

Клиент уже использует `@tanstack/react-query` с `useQuery({ queryKey: ["cards"], queryFn: fetchCards })` в `App.tsx`.

После успешного PATCH-запроса вызывается `queryClient.invalidateQueries({ queryKey: ["cards"] })`. Это заставляет React Query:
1. Пометить кэшированные данные как устаревшие
2. Автоматически перезапросить `fetchCards()` при следующем рендере
3. Обновить UI новыми данными

Это стандартный паттерн React Query: не нужно вручную обновлять кэш, `invalidateQueries` делает всё сам.

## 3. Слои: сервис, контроллер, middleware

### Сервис — без HTTP-зависимостей

В сервисе (`cards.service.ts`) **не будет** `req`, `res` и `status`. Сервис — чистая бизнес-логика: принимает `id` и `isDone`, обновляет карточку в массиве, возвращает `true`/`false`. Это соответствует уже установленному паттерну: сервис не знает про HTTP.

### Middleware — валидация

Валидация вынесена в `validateDoneToggle.ts`. Контроллер получает уже проверенные данные. Это соответствует паттерну, установленному в `validateNewCard.ts`.

## 4. Структура middleware validateDoneToggle

**Файл:** `server/middleware/validateDoneToggle.ts`

```ts
import type { Request, Response, NextFunction } from "express";

export function validateDoneToggle(req: Request, res: Response, next: NextFunction): void {
  const isDone = req.body?.isDone;
  if (typeof isDone !== "boolean") {
    res.status(400).json({ error: "Поле isDone должно быть булевым значением" });
    return;
  }
  next();
}
```

**Логика:**
- Проверяет `req.body?.isDone` — если `undefined` или не булево → 400 JSON
- Если булево → `next()` передаёт управление контроллеру
- Подключается в роутере перед контроллером: `router.patch("/:id", validateDoneToggle, updateCardDoneHandler)`

## 5. Порядок регистрации роутов

```ts
router.patch("/:id", validateDoneToggle, updateCardDoneHandler);
```

Параметрический роут `/patch("/:id")` — единственный PATCH-роут, конфликтов нет.

## 6. Структура функций

### Сервис — `updateCardDone(id: string, isDone: boolean): Promise<boolean>`
- Находит карточку по `id` через `findIndex`
- Если не найдена — возвращает `false`
- Если найдена — переключает `isDone`, возвращает `true`
- Не знает про HTTP: нет `req`, `res`, `status`

### Контроллер — `updateCardDoneHandler(req: Request, res: Response): Promise<void>`
- Вызывает `await updateCardDone(req.params.id, req.body.isDone)`
- Если `false` — 404 JSON (сервис не нашёл карточку)
- Если `true` — 200 JSON с обновлённой карточкой

### Роутер
- `router.patch("/:id", validateDoneToggle, updateCardDoneHandler)`

## 7. Изменения в коде

**Сервер:**
- `server/services/cards.service.ts` — добавить `updateCardDone`
- `server/controllers/cards.controller.ts` — добавить `updateCardDoneHandler`
- `server/routes/cards.routes.ts` — добавить `router.patch`
- `server/middleware/validateDoneToggle.ts` — новое middleware

**Клиент:**
- `client/src/api/cards.ts` — добавить `toggleCardDone(id, isDone)`
- `client/src/components/BoardCard/BoardCard.tsx` — добавить элемент управления (чекбокс), пробросить `id` и `onToggle`
- `client/src/components/BoardColumn/BoardColumn.tsx` — передать `id` и `onToggle` в `BoardCard`
- `client/src/App.tsx` — добавить `useMutation` для PATCH, пробросить `onToggle` в `BoardColumn`

**Без изменений:**
- `server/index.ts` — только добавить импорт и `app.use` для роутера (если роутер не подключён)
- `client/src/types/card.ts` — тип `Card` уже содержит `isDone`
