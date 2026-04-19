import { useState, useCallback, useRef, useEffect } from "react";
import type { PanelData } from "../../data/panels";
import type { Comment } from "../../data/comments";
import { subscribeToComments, saveComment, deleteComment } from "../../data/comments";
import Pin from "../Pin/Pin";
import StickyNote from "../StickyNote/StickyNote";
import CommentPin from "../CommentPin/CommentPin";
import CommentBubble from "../CommentBubble/CommentBubble";
import CommentInput from "../CommentInput/CommentInput";
import styles from "./Panel.module.css";

interface PanelProps {
  data: PanelData;
  commentMode: boolean;
}

export default function Panel({ data, commentMode }: PanelProps) {
  const [pinsVisible, setPinsVisible] = useState(false);
  const [activePinId, setActivePinId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Comment state
  const [comments, setComments] = useState<Comment[]>([]);
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [pendingCoords, setPendingCoords] = useState<{ x: number; y: number } | null>(null);

  // Real-time Firestore subscription
  useEffect(() => {
    if (!commentMode) return;

    const unsubscribe = subscribeToComments(data.id, setComments);
    return () => unsubscribe();
  }, [commentMode, data.id]);

  // Clear detail pins on outside click (existing behavior)
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

  const handlePanelTap = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (commentMode) {
        // Place a new comment pin
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setActiveCommentId(null);
        setPendingCoords({ x, y });
        return;
      }

      // Detail pin logic
      if (activePinId) {
        setActivePinId(null);
        return;
      }
      if (!pinsVisible) {
        setPinsVisible(true);
      }
    },
    [commentMode, activePinId, pinsVisible]
  );

  const handlePinTap = useCallback((pinId: string) => {
    setActivePinId((prev) => (prev === pinId ? null : pinId));
  }, []);

  const handleCloseNote = useCallback(() => {
    setActivePinId(null);
  }, []);

  // Comment handlers
  const handleCommentPinTap = useCallback((commentId: string) => {
    setActiveCommentId((prev) => (prev === commentId ? null : commentId));
  }, []);

  const handleDeleteComment = useCallback((commentId: string) => {
    deleteComment(commentId);
    setActiveCommentId(null);
  }, []);

  const handleCommentSubmit = useCallback(
    (text: string) => {
      if (!pendingCoords) return;
      saveComment({
        panelId: data.id,
        x: pendingCoords.x,
        y: pendingCoords.y,
        text,
        timestamp: Date.now(),
      });
      setPendingCoords(null);
    },
    [pendingCoords, data.id]
  );

  const handleCommentCancel = useCallback(() => {
    setPendingCoords(null);
  }, []);

  const activePin = data.pins.find((p) => p.id === activePinId) ?? null;
  const activeComment = comments.find((c) => c.id === activeCommentId) ?? null;

  return (
    <div className={styles.panel} ref={panelRef} onClick={handlePanelTap}>
      <img
        className={styles.image}
        src={data.imageSrc}
        alt={`Panel ${data.id}`}
        loading="lazy"
        draggable={false}
      />

      {/* Detail pins */}
      {!commentMode &&
        pinsVisible &&
        data.pins.map((pin) => (
          <Pin key={pin.id} pin={pin} onTap={handlePinTap} />
        ))}

      {!commentMode && <StickyNote pin={activePin} onClose={handleCloseNote} />}

      {/* Comment pins */}
      {commentMode &&
        comments.map((c) => (
          <CommentPin key={c.id} comment={c} onTap={handleCommentPinTap} />
        ))}

      {commentMode && (
        <CommentBubble
          comment={activeComment}
          onClose={() => setActiveCommentId(null)}
          onDelete={handleDeleteComment}
        />
      )}

      <CommentInput
        open={!!pendingCoords}
        onSubmit={handleCommentSubmit}
        onCancel={handleCommentCancel}
      />
    </div>
  );
}
