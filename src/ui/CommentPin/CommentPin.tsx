import { motion } from "framer-motion";
import type { Comment } from "../../data/comments";
import styles from "./CommentPin.module.css";

interface CommentPinProps {
  comment: Comment;
  onTap: (commentId: string) => void;
}

export default function CommentPin({ comment, onTap }: CommentPinProps) {
  return (
    <motion.button
      className={styles.pin}
      style={{ left: `${comment.x}%`, top: `${comment.y}%` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      onClick={(e) => {
        e.stopPropagation();
        onTap(comment.id);
      }}
      aria-label="Comment"
    >
      <div className={styles.head} />
    </motion.button>
  );
}
