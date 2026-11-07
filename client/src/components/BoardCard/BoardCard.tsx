import styles from "./BoardCard.module.css";

type BoardCardProps = {
  id: string;
  title: string;
  isDone: boolean;
  onToggle: (id: string, isDone: boolean) => void;
};

export function BoardCard({ id, title, isDone, onToggle }: BoardCardProps) {
  return (
    <div className={isDone ? styles.isDone : styles.card}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={isDone}
        onChange={(e) => onToggle(id, e.target.checked)}
      />
      {title}
    </div>
  );
}
