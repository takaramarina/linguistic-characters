import { useState } from "react";
import { panels } from "../../data/panels";
import Panel from "../../ui/Panel/Panel";
import styles from "./CarouselView.module.css";

interface CarouselViewProps {
  onBack: () => void;
}

export default function CarouselView({ onBack }: CarouselViewProps) {
  const [detailMode, setDetailMode] = useState(false);
  const [commentMode, setCommentMode] = useState(false);

  function handleDetailToggle() {
    setDetailMode((prev) => !prev);
    if (commentMode) setCommentMode(false);
  }

  function handleCommentToggle() {
    setCommentMode((prev) => !prev);
    if (detailMode) setDetailMode(false);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onBack} aria-label="Back to overview">
          ← Overview
        </button>
        <button
          className={`${styles.toggle} ${detailMode ? styles.detailToggleActive : ""}`}
          onClick={handleDetailToggle}
          aria-label="Toggle details"
        >
          Details
        </button>
        <button
          className={`${styles.toggle} ${commentMode ? styles.commentToggleActive : ""}`}
          onClick={handleCommentToggle}
          aria-label="Toggle comments"
        >
          Comments
        </button>
      </div>
      <div className={styles.carousel}>
        {panels.map((panel) => (
          <Panel key={panel.id} data={panel} detailMode={detailMode} commentMode={commentMode} />
        ))}
      </div>
    </div>
  );
}
