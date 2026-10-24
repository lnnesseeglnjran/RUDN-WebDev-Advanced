import { useBoardFiltersStore } from "../../store/boardFiltersStore";
import styles from "./BoardHeader.module.css";

export function BoardHeader() {
  const hideDone = useBoardFiltersStore((state) => state.hideDone);
  const toggleHideDone = useBoardFiltersStore((state) => state.toggleHideDone);

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Канбан-доска</h1>
      <div className={styles.controls}>
        <button type="button" onClick={toggleHideDone}>
          {hideDone ? "Показать все" : "Скрыть выполненные"}
        </button>
      </div>
    </header>
  );
}