"use strict";

import {getAll, addNotesRest} from "../Services/restService.js";

let notes = [];
notes = await getAll();

const createID = () => Date.now(); // erzeugt eindeutige Id
//const notes = JSON.parse(localStorage.getItem("notes") || "[ ]"); // "notes") || "[ ]" wenn schon eins besteht dieses verwenden, ansonsten neues Array erstellen
const checkboxDone = document.getElementById("done");

export function addNote(data) {
	data.id = createID(); //ID vergeben
	data.completed = false;
	data.creationdate = Date.now(); //jetztiges Datum mitgeben
	notes.push(data); //Infos in Array setzen
	//localStorage.setItem("notes", JSON.stringify(notes)); //String erstellen des Objects und in localStorage schreiben
	addNotesRest(notes);
}

/*export function getNotes() {
	return notes; //alle notes zurückgeben
}*/

export function getById(id) {
	let noteById = notes.find(notes => notes.id == id); // nur ==, weil typ ist nicht gleich
	return noteById;
}

export function updateNote(id, data) {
	let upIndex; //enfällt mit Rest
	data.id = id; //entfällt mit Rest
	upIndex = notes.findIndex(notes => notes.id == id);
	if (checkboxDone.checked === true){
		notes.splice(upIndex, 1);
	} else{
		notes[upIndex].title = data.title;
		notes[upIndex].duedate = data.duedate;
		notes[upIndex].importance = data.importance;
		notes[upIndex].description = data.description;
	}
	//localStorage.setItem("notes", JSON.stringify(notes));
	addNote(notes);
}

export function updateChecked(id, data, checkStatus) {
	let upIndex;
	data.id = id;
	upIndex = notes.findIndex(notes => notes.id == id);
	if (checkStatus.checked === true){
		notes[upIndex].completed = true;
	} else {
		notes[upIndex].completed = false;
	}
	//localStorage.setItem("notes", JSON.stringify(notes)); //enfällt mit Rest
	addNote(notes);
}

export function sortTitle(note, direction){
	if (direction === "low-high") {
		note.sort(function(a, b){
			if(a.title > b.title) { return -1; }
			if(a.title < b.title) { return 1; }
			return 0;
		});
	} else {
		note.sort(function(a, b){
			if(a.title < b.title) { return -1; }
			if(a.title > b.title) { return 1; }
			return 0;
		});
	}
}

export function sortDate(note, direction){
	if (direction === "low-high") {
		note.sort(function(a, b){
			if(a.duedate > b.duedate) { return -1; }
			if(a.duedate < b.duedate) { return 1; }
			return 0;
		});
	} else {
		note.sort(function(a, b){
			if(a.duedate < b.duedate) { return -1; }
			if(a.duedate > b.duedate) { return 1; }
			return 0;
		});
	}
}

export function sortCreation(note, direction){
	if (direction === "low-high") {
		note.sort(function(a, b){
			if(a.creationdate > b.creationdate) { return -1; }
			if(a.creationdate < b.creationdate) { return 1; }
			return 0;
		});
	} else {
		note.sort(function(a, b){
			if(a.creationdate < b.creationdate) { return -1; }
			if(a.creationdate > b.creationdate) { return 1; }
			return 0;
		});
	}
}

export function sortImportance(note, direction){
	if (direction === "low-high") {
		note.sort(function(a, b){
			if(a.importance > b.importance) { return -1; }
			if(a.importance < b.importance) { return 1; }
			return 0;
		});
	} else {
		note.sort(function(a, b){
			if(a.importance < b.importance) { return -1; }
			if(a.importance > b.importance) { return 1; }
			return 0;
		});
	}
}



