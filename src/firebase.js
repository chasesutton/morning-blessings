// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
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

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

export { db, auth };