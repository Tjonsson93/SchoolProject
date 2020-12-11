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
    
     for (everyNote of notes) {
        list.append(`<li> <h3>${everyNote.title}</h3> <br> 
        <p>${everyNote.text}</p>
        <button class="deleteButton">Delete</button></li>`);
    }
    deleteFunction();
}

function renderTitleList() {
    let listOfTitles = $("#titleList");
    listOfTitles.empty();
    
    for (everyTitle of notes) {
        listOfTitles.append(`<li><h4> ${everyTitle.title} </h4>
        <button class="deleteButton">Delete</button> </li>`);
    }
    deleteFunction();
}

async function deleteNote(note) {
    
    let result = await fetch("/rest/notes:id", { method: "DELETE", body: JSON.stringify(notes)
});
}

function deleteFunction() {
    let deleteButtons = $(".deleteButton");

    for (let i = 0; i < deleteButtons.length; i++) {
        $(deleteButtons[i]).click(function () {
            let parentElement = this.parentElement;
            parentElement.style.display = "none";
            deleteNote(notes[i]);
            notes.splice(i,1); 
        })
    }
}