import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "../firebase";

export interface Comment {
  id: string;
  panelId: number;
  x: number; // percentage (0–100)
  y: number; // percentage (0–100)
  text: string;
  timestamp: number;
}

const commentsRef = collection(db, "comments");

export async function saveComment(
  comment: Omit<Comment, "id">
): Promise<void> {
  await addDoc(commentsRef, comment);
}

export async function deleteComment(commentId: string): Promise<void> {
  await deleteDoc(doc(db, "comments", commentId));
}

export async function updateCommentPosition(
  commentId: string,
  x: number,
  y: number
): Promise<void> {
  await updateDoc(doc(db, "comments", commentId), { x, y });
}

export function subscribeToComments(
  panelId: number,
  callback: (comments: Comment[]) => void
): Unsubscribe {
  const q = query(
    commentsRef,
    where("panelId", "==", panelId),
    orderBy("timestamp", "asc")
  );

  return onSnapshot(q, (snapshot) => {
    const comments: Comment[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Comment, "id">),
    }));
    callback(comments);
  });
}
