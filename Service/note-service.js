import Datastore from 'nedb-promises'

const ndb = new Datastore({filename: '../data/data.db', autoload: true});


export function addNote (note){
    ndb.remove();
    /*ndb.insert(note, function (err, newDoc) {
        if (callback) {
            callback(err, newDoc);
        }
    });*/
}

export function getAll (){
    ndb.find({}, function (err, docs) {
        callback(err, docs);
    });
}
