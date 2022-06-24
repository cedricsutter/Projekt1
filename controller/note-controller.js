import {notes} from "../Sevice/note-service.js";

export function createNote(req, res) {
    notes.add(req.body, function (err, note) {
        console.log("      callback start");
        res.send("new note created");
        console.log("      callback end");
    });
}

export function showNotes(req, res) {
    notes.all( function (err, note) {
        res.send(note);
    });
}

export function deleteNote(req, res) {
    notes.delete(req.params.uid, function (err, order) {
        res.send("deleted");
    });
}

export function updateNote(req, res) {
    notes.update(req.params.uid, req.body, function (err, order) {
        res.send("updated");
    });
}