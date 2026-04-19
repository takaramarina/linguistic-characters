import { useState } from "react";
import { panels } from "../../data/panels";
import Panel from "../../ui/Panel/Panel";
import styles from "./CarouselView.module.css";

interface CarouselViewProps {
  onBack: () => void;
}

export default function CarouselView({ onBack }: CarouselViewProps) {
  const [commentMode, setCommentMode] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onBack} aria-label="Back to overview">
          ← Overview
        </button>
        <button
          className={`${styles.commentToggle} ${commentMode ? styles.commentToggleActive : ""}`}
          onClick={() => setCommentMode((prev) => !prev)}
          aria-label="Toggle comments"
        >
          {commentMode ? "Viewing comments" : "Comments"}
        </button>
      </div>
      <div className={styles.carousel}>
        {panels.map((panel) => (
          <Panel key={panel.id} data={panel} commentMode={commentMode} />
        ))}
      </div>
    </div>
  );
}
