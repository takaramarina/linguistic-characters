import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CommentInput.module.css";

interface CommentInputProps {
  open: boolean;
  x: number;
  y: number;
  onSubmit: (text: string) => void;
  onCancel: () => void;
}

export default function CommentInput({ open, x, y, onSubmit, onCancel }: CommentInputProps) {
  const [text, setText] = useState("");

  function handleSubmit() {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setText("");
  }

  function handleCancel() {
    setText("");
    onCancel();
  }

  const left = x > 55 ? `${x - 58}%` : `${x + 3}%`;
  const top = y > 60 ? `${y - 42}%` : `${y + 5}%`;

  return (
    <AnimatePresence>
      {open && (
        <>
          <div
            className={styles.backdrop}
            onClick={(e) => { e.stopPropagation(); handleCancel(); }}
          />
          <motion.div
            className={styles.popover}
            style={{ left, top }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
          >
            <textarea
              className={styles.textarea}
              placeholder="What do you notice here?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              autoFocus
            />
            <div className={styles.actions}>
              <button className={styles.cancelBtn} onClick={handleCancel}>
                Cancel
              </button>
              <button
                className={styles.submitBtn}
                onClick={handleSubmit}
                disabled={!text.trim()}
              >
                Post
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
