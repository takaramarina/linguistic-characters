import { useRef } from "react";
import { motion } from "framer-motion";
import type { Comment } from "../../data/comments";
import styles from "./CommentPin.module.css";

interface CommentPinProps {
  comment: Comment;
  onTap: (commentId: string) => void;
  onDragEnd: (commentId: string, x: number, y: number) => void;
}

export default function CommentPin({ comment, onTap, onDragEnd }: CommentPinProps) {
  const didDrag = useRef(false);

  return (
    <motion.button
      className={styles.pin}
      style={{ left: `${comment.x}%`, top: `${comment.y}%` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      drag
      dragMomentum={false}
      onDragStart={() => { didDrag.current = false; }}
      onDrag={() => { didDrag.current = true; }}
      onDragEnd={(_, info) => {
        if (!didDrag.current) return;
        const el = (_.target as HTMLElement).closest(`.${styles.pin}`);
        if (!el) return;
        const panel = el.parentElement;
        if (!panel) return;
        const rect = panel.getBoundingClientRect();
        const newX = ((comment.x / 100) * rect.width + info.offset.x) / rect.width * 100;
        const newY = ((comment.y / 100) * rect.height + info.offset.y) / rect.height * 100;
        const clampedX = Math.max(0, Math.min(100, newX));
        const clampedY = Math.max(0, Math.min(100, newY));
        onDragEnd(comment.id, clampedX, clampedY);
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (!didDrag.current) {
          onTap(comment.id);
        }
      }}
      aria-label="Comment"
    >
      <div className={styles.head} />
    </motion.button>
  );
}
