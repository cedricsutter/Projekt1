const newNote = document.getElementById("note");
const newNoteForm = document.createElement("div");


newNoteForm.innerHTML= "<h1>Sort</h1>\n" +
    "            <button data-id=\"highest\">Highest Prio</button>\n" +
    "            <button data-id=\"newest\">Newest</button>";

newNote.appendChild(newNoteForm);

