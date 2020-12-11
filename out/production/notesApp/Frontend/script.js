let notes = [];

function addNote() {
    let titleInput = $("#titleInput").val();
    let textInput = $("#noteField").val();
    
    if (titleInput.length > 0 && textInput.length > 0) {

        let note = {
            title: titleInput,
            text: textInput
        }

        notes.push(note);
       
    } else {
        alert("Please enter title and text.");
    }

    renderList();
    renderTitleList();
}

function renderList() {
    let list = $("#notesList");
    list.empty();
    
    let noteElementList = notes.map(function (note, index) {
        return `
        <li>
        <h3>${note.title}</h3> <br>
        <p>${note.text}</p>
        <button class="trashBtn" onclick="deleteNote(${index})">Delete</button>
        </li>`;
    });

    list.append(noteElementList.join(""));
}

function renderTitleList() {
    let listOfTitles = $("#titleList");
    listOfTitles.empty();
    
    for (everyTitle of notes) {
        listOfTitles.append(`<li><h4> ${everyTitle.title} </h4> </li>`);
    }
    
}

async function deleteNote(noteIndex) {
    
    let note = notes[noteIndex];

    await fetch("/rest/notes:id", { method: "DELETE", body: JSON.stringify(notes)
});
    notes.splice(noteIndex, 1);
}