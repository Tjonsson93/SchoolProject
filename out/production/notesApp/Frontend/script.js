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
        addItemToDB(note);
    } else {
        alert("Please enter title and text.");
    }
    renderList();    
}

function renderList() {
    let list = $("#notesList");
    list.empty();
    
     for (everyNote of notes) {
        list.append(`<li> <h3>${everyNote.title}</h3> <br> 
        <p>${everyNote.text}</p>
        <button class="deleteButton" onClick="window.location.reload()">Delete</button></li>`);

    }
    deleteFunction();
}

async function deleteNote(note) {
    
    let result = await fetch("/rest/notes/id", {
        method: "DELETE",
        body: JSON.stringify(note)
    });
}

function deleteFunction() {
    let deleteButtons = $(".deleteButton");

    for (let i = 0; i < deleteButtons.length; i++) {
        $(deleteButtons[i]).click(function () {
            let parentElement = this.parentElement;
            parentElement.style.display = "none";
            console.log(notes[i]);
            deleteNote(notes[i]);
            notes.splice(i,1); 
        });
    }

}

async function addItemToDB(note) {
    let result = await fetch('/rest/notes', {
        method: "POST",
        body: JSON.stringify(note)
    });
}

async function getNotes() {
    let result = await fetch('/rest/notes');
    notes = await result.json();

    renderList();
}

getNotes();