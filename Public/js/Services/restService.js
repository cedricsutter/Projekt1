let notes = [];
notes = await getNotes();

function getRestURL() {
    return 'http://127.0.0.1:3001/';
}

async function getNotes() {
    const noteRestURL = getRestURL();
    try {
        let response = await fetch(noteRestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        })
        let result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function addNotesRest(data) {
    const noteRestURL = getRestURL();
    try {
        let response = await fetch(noteRestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        })
    } catch (error) {
        throw error;
    }
}

export async function updateNotes(data, id) {
    let noteRestURL = getRestURL();
    noteRestURL = noteRestURL + id.toString();
    try {
        let response = await fetch(noteRestURL, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        })
    } catch (error) {
        throw error;
    }
}

export async function deleteNote (id) {
    let noteRestURL = getRestURL();
    noteRestURL = noteRestURL + id.toString();
    console.log(noteRestURL);
    try {
        let response = await fetch(noteRestURL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        })
    } catch (error) {
        throw error;
    }
}

export function getAll() {
    return notes;
}
