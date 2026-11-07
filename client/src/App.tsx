import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BoardHeader } from "./components/BoardHeader/BoardHeader";
import { BoardColumn } from "./components/BoardColumn/BoardColumn";
import { NewCardForm } from "./components/NewCardForm/NewCardForm";
import { fetchCards, toggleCardDone } from "./api/cards";
import styles from "./App.module.css";

function App() {
  const { data: cards, isLoading } = useQuery({
    queryKey: ["cards"],
    queryFn: fetchCards,
  });
  const queryClient = useQueryClient();

    const mutation = useMutation({
    mutationFn: ({ id, isDone }: { id: string; isDone: boolean }) => toggleCardDone(id, isDone),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });
  const handleToggle = (id: string, isDone: boolean) => {
    mutation.mutate({ id, isDone });
  };
  return (
    <div className={styles.app}>
      <BoardHeader />
      <main className={styles.board}>
        <NewCardForm />
        <div className={styles.columns}>
          {isLoading ? (
            <p>Загрузка…</p>
          ) : (
            <BoardColumn cards={cards ?? []} onToggle={handleToggle} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
