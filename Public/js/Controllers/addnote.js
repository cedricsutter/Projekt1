import { addNote, getById, updateNote } from "../Services/noteService.js";
//import { addNote, getById, updateNote } from "../Services/restService.js";

const closeAndLeave = document.getElementById("CloseAndLeave");
const form = document.forms[0]; //erstes form element

closeAndLeave.addEventListener("click", closeLeave);

export function setStyle() {
	let theme = document.getElementsByTagName("link")[0];
	if (localStorage.getItem("Style") == "Vio") {
		theme.setAttribute("href", "CSS/addnoteVio.css");
		localStorage.setItem("Style", "Vio");
	} else {
		theme.setAttribute("href", "CSS/addnote.css");
		localStorage.setItem("Style", "Light");
	}
}

function closeLeave() {
	window.open("Index.html", "_self");
}

form.addEventListener("submit", function(event) {
	event.preventDefault();
	const formData = new FormData(this);
	const entries = formData.entries();
	const data = Object.fromEntries(entries);
	const queryString = window.location.search;
	const urlUp = new URLSearchParams(queryString);
	const id = urlUp.get("noteid");
	if(id) {
		updateNote(id, data);
	} else {
		addNote(data);
	}
	closeLeave(); //zurück zur Startseite
});

function setForm() {
	const queryString = window.location.search;
	const url = new URLSearchParams(queryString);
	const id = url.get("noteid");
	if(id) {
		const note = getById(id);
		document.getElementById("title").value = note.title;
		document.getElementById("description").value = note.description;
		document.getElementById("importance").value = note.importance;
		document.getElementById("duedate").value = note.duedate;
		document.getElementById("create").style.display = "none";
	} else {
		document.getElementById("update").style.display = "none";
		document.getElementById("doneDiv").style.display = "none";
	}
}

function initialisieren(){
	setForm();
	setStyle();
}

initialisieren();

