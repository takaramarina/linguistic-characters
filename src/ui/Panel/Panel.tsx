import { useState, useCallback, useRef, useEffect } from "react";
import type { PanelData } from "../../data/panels";
import Pin from "../Pin/Pin";
import StickyNote from "../StickyNote/StickyNote";
import styles from "./Panel.module.css";

interface PanelProps {
  data: PanelData;
}

export default function Panel({ data }: PanelProps) {
  const [pinsVisible, setPinsVisible] = useState(false);
  const [activePinId, setActivePinId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pinsVisible) return;

    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setActivePinId(null);
        setPinsVisible(false);
      }
    }

    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, [pinsVisible]);

  const handlePanelTap = useCallback(() => {
    if (activePinId) {
      setActivePinId(null);
      return;
    }
    if (!pinsVisible) {
      setPinsVisible(true);
    }
  }, [activePinId, pinsVisible]);

  const handlePinTap = useCallback((pinId: string) => {
    setActivePinId((prev) => (prev === pinId ? null : pinId));
  }, []);

  const handleCloseNote = useCallback(() => {
    setActivePinId(null);
  }, []);

  const activePin = data.pins.find((p) => p.id === activePinId) ?? null;

  return (
    <div className={styles.panel} ref={panelRef} onClick={handlePanelTap}>
      <img
        className={styles.image}
        src={data.imageSrc}
        alt={`Panel ${data.id}`}
        loading="lazy"
        draggable={false}
      />

      {pinsVisible &&
        data.pins.map((pin) => (
          <Pin key={pin.id} pin={pin} onTap={handlePinTap} />
        ))}

      <StickyNote pin={activePin} onClose={handleCloseNote} />
    </div>
  );
}
