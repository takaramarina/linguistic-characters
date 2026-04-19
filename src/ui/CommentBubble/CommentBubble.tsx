import { motion, AnimatePresence } from "framer-motion";
import type { Comment } from "../../data/comments";
import styles from "./CommentBubble.module.css";

interface CommentBubbleProps {
  comment: Comment | null;
  onClose: () => void;
  onDelete: (commentId: string) => void;
}

function formatTime(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function CommentBubble({ comment, onClose, onDelete }: CommentBubbleProps) {
  if (!comment) return null;

  const left = comment.x > 55 ? `${comment.x - 58}%` : `${comment.x + 3}%`;
  const top = comment.y > 60 ? `${comment.y - 30}%` : `${comment.y + 5}%`;

  return (
    <AnimatePresence>
      {comment && (
        <>
          <div className={styles.backdrop} onClick={onClose} />
          <motion.div
            key={comment.id}
            className={styles.bubble}
            style={{ left, top }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className={styles.text}>{comment.text}</p>
            <div className={styles.footer}>
              <span className={styles.time}>{formatTime(comment.timestamp)}</span>
              <button
                className={styles.deleteBtn}
                onClick={() => onDelete(comment.id)}
                aria-label="Delete comment"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
