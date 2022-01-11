import { db } from "./firestore.js";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDoc,
  onSnapshot,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

let notes = [];
let sortedNotes = [];
let submit = true;
let id = ''

const onGetNotes = (callback) => {
  onSnapshot(collection(db, "notes"), callback);
};

export let traerDatos = async () => {
  onGetNotes((snapshot) => {
    notes = [];
    snapshot.forEach((doc) => {
      let nota = doc.data();
      nota.id = doc.id;
      notes.push(nota);
    });
    sortedNotes = notes.slice().sort((a, b) => b.date - a.date);

    renderNotes();
    listeners()
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
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
noteForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = noteForm["titulo"].value;
  const tipo = noteForm["dropdown"].value;
  const mes = noteForm["mes"].value;
  const description = noteForm["description"].value;
  if(submit) {
    await saveNote(title, tipo, mes, description);
    noteForm.reset();
  } else {
    await updateNote(id,{
      title,
      tipo,
      mes,
      description
    })  
    document.getElementById('submitEdit').innerHTML = 'Submit'
    submit = true
    noteForm.reset()
  }
});

let updateNote = async (idDoc,updatedNote) => {
  let noteRef = doc(db, "notes", idDoc)
  await updateDoc(noteRef, updatedNote)
}

let renderNotes = () => {
  document.getElementById("mostrar-notas-content").innerHTML = "";
  for (const note of sortedNotes) {
    let bg = ''
    let tx = ''
    switch(note.tipo){
      case 'Personal':
        bg = 'bg-dark'
        tx = 'text-white'
        break;
      case 'Professional':
        bg = 'bg-light'
        tx = 'text-dark'
        break;
      case 'Relationships':
        bg = 'bg-warning'
        tx = 'text-dark'
        break;
      case 'Family':
        bg = 'bg-danger'
        tx = 'text-white'
        break;
      case 'Health':
        bg = 'bg-success'
        tx = 'text-white'
        break;
      case 'Learning':
        bg = 'bg-primary'
        tx = 'text-white'
        break;
    }
    document.getElementById("mostrar-notas-content").innerHTML += `
    <div class="card ${bg} ${tx}" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${note.title}</h5>
        <h6 class="card-subtitle mb-2">${note.tipo}</h6>
        <h6 class="card-subtitle mb-2">Objetivo a: ${note.mes}</h6>
        <p class="card-text fw-light">${note.description}</p>
        <div class="card-btns">
          <button class="btn btn-secondary btn-sm btn-edit" data-id="${note.id}">Edit</button>
          <button class="btn btn-secondary btn-sm btn-delete" data-id="${note.id}">Delete</button>
        </div>
      </div>
   </div>
    `;
  }

};

let listeners = () => {
  const btnsEdit = document.querySelectorAll(".btn-edit");
  btnsEdit.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      id = e.target.dataset.id
      let nota =await getDoc(doc(db, "notes", e.target.dataset.id))
      submitEdit(nota)
    });
  });
  const btnsDelete = document.querySelectorAll(".btn-delete");
  btnsDelete.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      await deleteDoc(doc(db,"notes",e.target.dataset.id))
    });
  });
}

let submitEdit = (nota) => {
  document.getElementById('submitEdit').innerHTML = 'Update'
  const noteForm = document.getElementById("Nota");
  noteForm["titulo"].value = nota.data().title
  noteForm["dropdown"].value = nota.data().tipo
  noteForm["mes"].value = nota.data().mes
  noteForm["description"].value = nota.data().description
  submit = false
}
