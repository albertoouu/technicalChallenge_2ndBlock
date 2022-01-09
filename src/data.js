import { db } from "./firestore.js";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

let notes = [];
let sortedNotes;

export let traerDatos = async () => {
  onGetNotes((snapshot) => {
    notes = [];
    snapshot.forEach((doc) => {
      let nota = doc.data();
      nota.id = doc.id;
      notes.push(nota);
    });
    console.log(notes);
    sortedNotes = notes.slice().sort((a, b) => b.date - a.date);

    renderNotes();
  });
};

const noteForm = document.getElementById("Nota");

const saveNote = async (title, tipo, mes, description) => {
  try {
    const docRef = await addDoc(collection(db, "notes"), {
      title,
      tipo,
      mes,
      description,
      date: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

noteForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("submiting");
  const title = noteForm["titulo"].value;
  const tipo = noteForm["dropdown"].value;
  const mes = noteForm["mes"].value;
  const description = noteForm["description"].value;
  console.log(title, tipo, mes, description);
  await saveNote(title, tipo, mes, description);
  noteForm.reset();
});

const onGetNotes = (callback) => {
  onSnapshot(collection(db, "notes"), callback);
};

let renderNotes = () => {
  console.log("render notes");
  document.getElementById("mostrar-notas-content").innerHTML = "";
  for (const note of sortedNotes) {
    console.log(note);
    document.getElementById("mostrar-notas-content").innerHTML += `
    <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">${note.title}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${note.tipo}</h6>
    <p class="card-text">${note.description}</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>
    `;
  }
};

/*
const querySnapshot = await getDocs(collection(db, "notes"));
querySnapshot.forEach((doc) => {
  console.log(doc.id, "=>", doc.data());
});
*/
