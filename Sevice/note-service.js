import Datastore from '@seald-io/nedb';
const db = new Datastore({filename: './data/note.db', autoload: true});

class Notes {
    constructor() {

    }

    add(newNotes, callback) {
        db.insert(newNotes, function (err, newDoc) {
            console.log("    insert");
            if (callback) {
                callback(err, newDoc);
            }
        });
    }

    delete(intid, callback) {
        intid = parseInt(intid);
        db.remove({id: intid}, {}, function (err, numRemoved){
        });
    }

    update(intid, newNotes, callback) {
        intid = parseInt(intid);
        db.remove({id: intid}, {}, function (err, numRemoved){
        });
        db.insert(newNotes, function (err, newDoc) {
            console.log("    insert");
            if (callback) {
                callback(err, newDoc);
            }
        });
    }

    all(callback) {
        db.find({}, function (err, docs) {
            callback(err, docs);
        });
    }
}

export const notes = new Notes();