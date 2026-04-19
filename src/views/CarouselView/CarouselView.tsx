import { panels } from "../../data/panels";
import Panel from "../../ui/Panel/Panel";
import styles from "./CarouselView.module.css";

interface CarouselViewProps {
  onBack: () => void;
}

export default function CarouselView({ onBack }: CarouselViewProps) {
  return (
    <div className={styles.wrapper}>
      <button className={styles.backBtn} onClick={onBack} aria-label="Back to overview">
        ← Overview
      </button>
      <div className={styles.carousel}>
        {panels.map((panel) => (
          <Panel key={panel.id} data={panel} />
        ))}
      </div>
    </div>
  );
}
