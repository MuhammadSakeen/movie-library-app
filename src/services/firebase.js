// src/firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCE0oBlXlJh2Yexwve9EsfXHuZTMw7y2IA",
  authDomain: "movie-library-app-f096c.firebaseapp.com",
  projectId: "movie-library-app-f096c",
  storageBucket: "movie-library-app-f096c.firebasestorage.app",
  messagingSenderId: "891138646717",
  appId: "1:891138646717:web:2c0c810b6a8c6b24c9cdd4"
};

const app = initializeApp(firebaseConfig);

export default app;
