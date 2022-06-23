"use strict";

/* Imports */
import {sortTitle, sortDate, sortCreation, sortImportance, updateChecked} from "../Services/noteService.js";
import {getAll} from "../Services/restService.js";
//import {getNotes} from "../Services/restService.js";

/* Variablen */
const styleChanger = document.getElementById("styleChanger");
const createNote = document.getElementById("createnote");
const onlyCompletedNotes = document.getElementById("taskdone");
const sortedByName = document.getElementById("sortedByName");
const sortedByDate = document.getElementById("sortedByDate");
const sortedByImportance = document.getElementById("sortedByImportance");
const sortedByCreationDate = document.getElementById("sortedByCreationDate");
const noteWrapper = document.getElementById("note-wrapper");

let nameSorted = "none";
let dueDateSorted = "none";
let importanceSorted = "none";
let creatingDataSorted = "none";
let statCompletet = "none";
let showCompleteOnly = false;

/* Eventlistener */
styleChanger.addEventListener("click", changeStyle);
createNote.addEventListener("click", createNotes);
onlyCompletedNotes.addEventListener("click", displayOnlyCompletedFunction);
sortedByName.addEventListener("click", displayAllNotesName);
sortedByDate.addEventListener("click", displayAllNotesDate);
sortedByImportance.addEventListener("click", displayAllNotesImportance);
sortedByCreationDate.addEventListener("click", displayAllNotesCreationDate);

/* Funktionen */
function clearLabels() {
	sortedByName.textContent = "Todo";
	sortedByDate.textContent = "Due Date";
	sortedByCreationDate.textContent = "Creation Date";
	sortedByImportance.textContent = "importance";
	onlyCompletedNotes.textContent = "Open Todos";
}

function clearDiv() {
	while(noteWrapper.firstChild){
		noteWrapper.removeChild(noteWrapper.firstChild);
	}
}

function createNotes(){
	window.open("addnote.html", "_self");
}

function displayOnlyCompletedFunction(){
	const note = getAll();
	showCompleteOnly = (showCompleteOnly === true) ? false : true ;
	clearDiv();
	if (statCompletet === "Open Tasks") {
		onlyCompletedNotes.textContent = "Open Todos";
		statCompletet = "All Tasks";
	} else {
		onlyCompletedNotes.textContent = "All Todos";
		statCompletet = "Open Tasks";
	}
	renderNotes(note);
}

function displayAllNotesName() {
	const note = getAll();
	clearLabels();
	if (nameSorted === "low-high") {
		clearDiv();
		sortedByName.textContent = "Todo ↑";
		sortTitle(note, nameSorted);
		renderNotes(note);
		nameSorted = "high-low";
	} else {
		clearDiv();
		sortedByName.textContent = "Todo ↓";
		sortTitle(note);
		renderNotes(note);
		nameSorted = "low-high";
	}
}

function displayAllNotesDate() {
	const note = getAll();
	clearLabels();
	if(dueDateSorted === "low-high") {
		clearDiv();
		sortedByDate.textContent = "Due Date ↑";
		sortDate(note, dueDateSorted);
		renderNotes(note);
		dueDateSorted = "high-low";
	} else {
		clearDiv();
		sortedByDate.textContent = "Due Date ↓";
		sortDate(note);
		renderNotes(note);
		dueDateSorted = "low-high";
	}
}

function displayAllNotesCreationDate() {
	const note = getAll();
	clearLabels();
	if(creatingDataSorted === "low-high") {
		clearDiv();
		sortedByCreationDate.textContent = "Creation Date ↑";
		sortCreation(note, creatingDataSorted);
		renderNotes(note);
		creatingDataSorted = "high-low";
	} else {
		clearDiv();
		sortedByCreationDate.textContent = "Creation Date ↓";
		sortCreation(note);
		renderNotes(note);
		creatingDataSorted = "low-high";
	}
}

function displayAllNotesImportance() {
	const note = getAll();
	clearLabels();
	if(importanceSorted === "low-high") {
		clearDiv();
		sortedByImportance.textContent = "Importance ↑";
		sortImportance(note, importanceSorted);
		renderNotes(note);
		importanceSorted = "high-low";
	} else {
		clearDiv();
		sortedByImportance.textContent = "Importance ↓";
		sortImportance(note);
		renderNotes(note);
		importanceSorted = "low-high";
	}
}

function divCreator(innerHTML, className) {
	const div = document.createElement("div");
	div.className = className;
	div.innerHTML = innerHTML;
	return div;
}

/* Render */
function renderNotes(note) {
	const onlyUnCompletedNotes = (showCompleteOnly === true ) ? note.filter(notes => notes.completed === false) : note;
	onlyUnCompletedNotes.forEach(notes => {
		const {completed, title, description, importance, duedate, id} = notes;
		const note = document.createElement("div");
		note.className = "note";
		note.appendChild(divCreator(duedate, "date"));
		note.appendChild(divCreator(title, "titlenote"));
		note.appendChild(divCreator(importance, "importance"));
		const buttonWrapper = document.createElement("div");
		buttonWrapper.className = "doneButton";
		const checkboxButton = document.createElement("input");
		checkboxButton.type = "checkbox";
		checkboxButton.className = "donecheckbox";
		checkboxButton.value = `${id}`;
		checkboxButton.name = `${id}`;
		const completedBool = (`${completed}`== "true"); //String in Bool umwandeln
		checkboxButton.checked = completedBool;
		checkboxButton.addEventListener("change", function () {
			updateChecked(id, notes, checkboxButton);
			const noteVar = getAll();
			clearDiv();
			renderNotes(noteVar);
		});
		buttonWrapper.appendChild(checkboxButton);
		note.appendChild(buttonWrapper);
		note.appendChild(divCreator(description, "description"));
		const editButtonWrapper = document.createElement("div");
		editButtonWrapper.className = "editbutton";
		const editButton = document.createElement("div");
		editButton.type = "button";
		editButton.id = "edit";
		editButton.className = "btn";
		editButton.textContent = "Edit";
		editButton.setAttribute("href", `${window.location.origin}/details.html?noteid=${id}`);
		editButton.addEventListener("click", function () {
			window.open(`${window.location.origin}/Projekt1/Public/addnote.html?noteid=${id}`, "_self");
		});
		editButtonWrapper.appendChild(editButton);
		note.appendChild(editButtonWrapper);
		noteWrapper.appendChild(note);
	});
}

/* Initialisierung */
function setStyle() {
	let theme = document.getElementsByTagName("link")[0];
	if (localStorage.getItem("Style") == "Vio") {
		theme.setAttribute("href", "CSS/indexVio.css");
		localStorage.setItem("Style", "Vio");
	} else {
		theme.setAttribute("href", "CSS/index.css");
		localStorage.setItem("Style", "Light");
	}
}

function changeStyle() {
	let theme = document.getElementsByTagName("link")[0];
	if (theme.getAttribute("href") == "CSS/index.css") {
		theme.setAttribute("href", "CSS/indexVio.css");
		localStorage.setItem("Style", "Vio");
	} else {
		theme.setAttribute("href", "CSS/index.css");
		localStorage.setItem("Style", "Light");
	}
}

function initialisieren(){
	setStyle();       //richtiges Theme holen, Light oder Vio
	displayAllNotesName();
}

initialisieren(); // seite inizialisieren
