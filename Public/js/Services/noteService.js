"use strict";

import {getAll, addNotesRest, updateNotes, deleteNote} from "../Services/restService.js";

let notes = [];
notes = getAll();

const createID = () => Date.now();
const checkboxDone = document.getElementById("done");

export async function addNote(data) {
	data.id = createID(); //ID vergeben
	data.completed = false;
	data.creationdate = Date.now(); //jetztiges Datum mitgeben
	await addNotesRest(data);
}

export function getById(id) {
	let noteById = notes.find(notes => notes.id == id); // nur ==, weil typ ist nicht gleich
	return noteById;
}

export async function updateNote(id, data) {
	notes = getAll();
	let upIndex; //enfällt mit Rest
	data.id = id; //entfällt mit Rest
	upIndex = notes.findIndex(notes => notes.id == id);
	if (checkboxDone.checked === true){
		notes.splice(upIndex, 1);
		await deleteNote(id);
	} else{
		let noteUpdate= [];
		notes[upIndex].title = data.title;
		notes[upIndex].duedate = data.duedate;
		notes[upIndex].importance = data.importance;
		notes[upIndex].description = data.description;
		noteUpdate=notes[upIndex];
		await updateNotes(noteUpdate, id);
	}
}

export async function updateChecked(id, data, checkStatus) {
	let upIndex;
	data.id = id;
	upIndex = notes.findIndex(notes => notes.id == id);
	if (checkStatus.checked === true){
		let noteUpdate= [];
		notes[upIndex].completed = true;
		noteUpdate = notes[upIndex];
		await updateNotes(noteUpdate, id);
	} else {
		let noteUpdate= [];
		notes[upIndex].completed = false;
		noteUpdate = notes[upIndex];
		await updateNotes(noteUpdate, id);
	}
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



