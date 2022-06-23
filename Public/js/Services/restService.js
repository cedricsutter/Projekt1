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

export function getAll() {
    return notes;
}
