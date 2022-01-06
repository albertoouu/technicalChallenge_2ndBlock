import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCTKvFidCIMJuNYHSqw-PEJJU0qMBBo0GI",
  authDomain: "prueba-6407c.firebaseapp.com",
  projectId: "prueba-6407c",
  storageBucket: "prueba-6407c.appspot.com",
  messagingSenderId: "122778719268",
  appId: "1:122778719268:web:22b8db0309c9a0762074b1",
});

const db = getFirestore();

/*
try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815,
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
*/
