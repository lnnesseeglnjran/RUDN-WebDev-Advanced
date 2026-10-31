## 1. API: функция удаления

- [ ] 1.1 Добавить `deleteCard(id: string)` в `client/src/api/cards.ts` с `fetch DELETE /api/cards/:id` и проверкой `response.ok`, убедиться что ошибка сервера выбрасывается

## 2. App: мутация удаления и проброс коллбека

- [ ] 2.1 Добавить `useQueryClient` и `useMutation` для удаления в `client/src/App.tsx`, убедиться что `onSuccess` инвалидирует кэш `["cards"]`
- [ ] 2.2 Пробросить `onDelete(id)` в `BoardColumn`, убедиться что коллбек вызывается при удалении

## 3. BoardColumn: проброс id и onDelete

- [ ] 3.1 Добавить `onDelete` в props `BoardColumn`, передать `card.id` и `onDelete` в `BoardCard` при рендере, убедиться что id и коллбек доходят до компонента

## 4. BoardCard: кнопка удаления и подтверждение

- [ ] 4.1 Добавить props `id: string` и `onDelete: (id: string) => void` в `BoardCard`, добавить кнопку удаления (крестик) в шаблон
- [ ] 4.2 Вызвать `window.confirm()` перед `onDelete(id)`, убедиться что при отказе карточка не удаляется
- [ ] 4.3 Добавить стили для кнопки удаления в `BoardCard.module.css`, убедиться что кнопка видна и не перекрывает текст карточки

## 5. Верификация

- [ ] 5.1 Убедиться, что валидация обоих изменений проходит: `openspec validate --changes cards-counter && openspec validate --changes empty-guard && openspec validate --changes delete-card`
- [ ] 5.2 Запустить приложение и проверить сценарии из спецификации: элемент удаления виден, подтверждение показывается, отказ оставляет карточку, удаление работает, после перезагрузки карточка не появляется