import Datastore from '@seald-io/nedb';
const db = new Datastore({filename: './data/order.db', autoload: true});

class Note {
    constructor(noteTitle, noteDescription, noteImportance) {
        this.noteTitle = noteTitle;
        this.noteDescription = noteDescription;
        this.noteImportance = noteImportance;
        this.orderDate = new Date();
        this.state = true;
    }
}


class Note {
    constructor() {

    }

    add(noteTitle, noteDescription, noteImportance, callback) {
        console.log("  publicAddNote start");
        let note = new Note(noteTitle, noteDescription, noteImportance);
        db.insert(note, function (err, newDoc) {
            console.log("    insert");
            if (callback) {
                callback(err, newDoc);
            }
        });
        console.log("  publicAddNote end");
    }

    delete(id, callback) {
        db.update({_id: id}, {$set: {"state": "DELETED"}}, {returnUpdatedDocs: true}, function (err, numDocs, doc) {
            callback(err, doc);
        });
    }

    get(id, callback) {
        db.findOne({_id: id}, function (err, doc) {
            callback(err, doc);
        });
    }

    all(callback) {
        db.find({}, function (err, docs) {
            callback(err, docs);
        });
    }
}

export const Note = new Note();

