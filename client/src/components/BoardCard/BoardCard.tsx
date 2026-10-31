import styles from "./BoardCard.module.css";

type BoardCardProps = {
  id: string;
  title: string;
  isDone: boolean;
  onDelete: (id: string) => void;
};

export function BoardCard({ id, title, isDone, onDelete }: BoardCardProps) {
  return (
    <div className={isDone ? styles.isDone : styles.card}>
      <button
        className={styles.deleteButton}
        type="button"
        onClick={() => onDelete(id)}
      >
        ×
      </button>
      {title}
    </div>
  );
}
