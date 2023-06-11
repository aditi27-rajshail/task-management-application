// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJTdZ3NzPRnyfD5zyKC-wrJgOVaOt-DhQ",
  authDomain: "todo-c6333.firebaseapp.com",
  projectId: "todo-c6333",
  storageBucket: "todo-c6333.appspot.com",
  messagingSenderId: "3754410241",
  appId: "1:3754410241:web:a51906ecd66e721f785b00",
  measurementId: "G-WPKWFLV3XB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
