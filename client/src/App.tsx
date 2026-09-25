import { useQuery } from "@tanstack/react-query";
import { BoardHeader } from "./components/BoardHeader/BoardHeader";
import { BoardColumn } from "./components/BoardColumn/BoardColumn";
import { NewCardForm } from "./components/NewCardForm/NewCardForm";
import { fetchCards } from "./api/cards";
import styles from "./App.module.css";

function App() {
  const { data: cards, isLoading } = useQuery({
    queryKey: ["cards"],
    queryFn: fetchCards,
  });

  return (
    <div className={styles.app}>
      <BoardHeader />
      <main className={styles.board}>
        <NewCardForm />
        <div className={styles.columns}>
          {isLoading ? (
            <p>Загрузка…</p>
          ) : (
            <BoardColumn cards={cards ?? []} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
