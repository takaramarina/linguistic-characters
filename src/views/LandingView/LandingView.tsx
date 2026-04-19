import { panels } from "../../data/panels";
import styles from "./LandingView.module.css";

interface LandingViewProps {
  onExplore: () => void;
}

export default function LandingView({ onExplore }: LandingViewProps) {
  return (
    <div className={styles.landing} onClick={onExplore}>
      <span className={styles.title}>Linguistic Characters</span>

      <div className={styles.panels}>
        {panels.map((panel) => (
          <img
            key={panel.id}
            src={panel.landingImageSrc}
            alt={`Panel ${panel.id}`}
          />
        ))}
      </div>

      <span className={styles.cta}>Tap to explore</span>
    </div>
  );
}
