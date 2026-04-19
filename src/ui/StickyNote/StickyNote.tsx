import { motion, AnimatePresence } from "framer-motion";
import type { Pin as PinType } from "../../data/panels";
import styles from "./StickyNote.module.css";

interface StickyNoteProps {
  pin: PinType | null;
  onClose: () => void;
}

export default function StickyNote({ pin, onClose }: StickyNoteProps) {
  return (
    <AnimatePresence>
      {pin && (
        <motion.div
          key={pin.id}
          className={styles.modal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            className={styles.closeBtn}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close"
          >
            ×
          </button>

          <div className={styles.content}>
            <img
              className={styles.image}
              src={pin.detailImage}
              alt={pin.label}
            />
            <div className={styles.text}>
              <h2 className={styles.label}>{pin.label}</h2>
              <p className={styles.note}>{pin.note}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
