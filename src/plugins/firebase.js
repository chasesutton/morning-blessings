// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEddBUOO0_0SFDDNF-I3fAAO7C_k6qDdI",
  authDomain: "morning-blessings.firebaseapp.com",
  projectId: "morning-blessings",
  storageBucket: "morning-blessings.appspot.com",
  messagingSenderId: "32135850629",
  appId: "1:32135850629:web:df660c49c833f0e73697ec",
  measurementId: "G-5BS50EFWM1",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db, analytics };
