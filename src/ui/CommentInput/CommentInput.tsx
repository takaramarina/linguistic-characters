import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CommentInput.module.css";

interface CommentInputProps {
  open: boolean;
  onSubmit: (text: string) => void;
  onCancel: () => void;
}

export default function CommentInput({ open, onSubmit, onCancel }: CommentInputProps) {
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

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { e.stopPropagation(); handleCancel(); }}
          />
          <motion.div
            className={styles.modal}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={styles.title}>Leave a comment</span>
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
