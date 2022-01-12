import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js"

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCTKvFidCIMJuNYHSqw-PEJJU0qMBBo0GI",
  authDomain: "prueba-6407c.firebaseapp.com",
  projectId: "prueba-6407c",
  storageBucket: "prueba-6407c.appspot.com",
  messagingSenderId: "122778719268",
  appId: "1:122778719268:web:22b8db0309c9a0762074b1",
});

export const db = getFirestore();
