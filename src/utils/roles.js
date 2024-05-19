import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

// Example: Define roles in Firestore
export const setUserRole = async (uid, role) => {
  await setDoc(doc(db, "roles", uid), {
    role,
  });
};
