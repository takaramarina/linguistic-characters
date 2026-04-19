import { motion } from "framer-motion";
import type { Pin as PinType } from "../../data/panels";
import styles from "./Pin.module.css";

interface PinProps {
  pin: PinType;
  onTap: (pinId: string) => void;
}

export default function Pin({ pin, onTap }: PinProps) {
  return (
    <motion.button
      className={styles.pin}
      style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      onClick={(e) => {
        e.stopPropagation();
        onTap(pin.id);
      }}
      aria-label={pin.label}
    >
      <div className={styles.head} />
    </motion.button>
  );
}
