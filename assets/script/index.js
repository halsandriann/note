function createNote(title, description) {
  const notesSectionElement = document.querySelector('#notes');

  const cardNote = `
    <div class="card">
      <h1 class="card__title">${title}</h1>
      <p class="card__description">${description}</p>
    </div>
  `;

  notesSectionElement.innerHTML = cardNote + notesSectionElement.innerHTML;
}

function saveToStorage(title, description) {
  const notes = JSON.parse(localStorage.getItem('notes')) ?? [];

  const note = {
    title: title,
    description: description,
  }

  notes.push(note);

  localStorage.setItem('notes', JSON.stringify(notes));
}

function initNotes() {
  const notes = JSON.parse(localStorage.getItem('notes')) ?? [];

  notes.map(function(note) {
    createNote(note.title, note.description);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  if (typeof(Storage) === undefined) {
    console.error('Storage not defined');
  } else {
    initNotes();

    const formElement = document.querySelector('#form_create_note');

    formElement.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(formElement);

      const titleNote = formData.get('title_note');
      const descriptionNote = formData.get('description_note');

      createNote(titleNote, descriptionNote);
      saveToStorage(titleNote, descriptionNote);

      formElement.reset();
    });
  }
});
