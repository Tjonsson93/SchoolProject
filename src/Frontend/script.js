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
        list.append(`<li> <h3>${everyNote.title}</h3> <br> <p>${everyNote.text}</p></li>`);
    }
    

}


function renderTitleList() {
    let listOfTitles = $("#titleList");
    listOfTitles.empty();
    
    for (everyTitle of notes) {
        listOfTitles.append(`<li><h4> ${everyTitle.title} </h4> </li>`);
    }
    
}






















function deleteFunction() {
    let deleteButtons = $(".deleteButton");
    deleteButtons.empty();


































































































function deleteFunction() {
    let deleteButtons = $(".deleteButton");
    deleteButtons.empty();

    for (let i = 0; i < deleteButtons.length; i++) {
        $(deleteButtons[i]).click(function () {
            let parentElement = this.parentElement;
            parentElement.style.display = "none";
            deleteNote(note[i]);
            notes.splice(i,1); 
        })
    }
}
async function deleteNote(note) {
    
    let noteToDelete = {
        id: notes.id,
    }
    let result = await fetch("/rest/items/id", {
        method: "DELETE",
        body: JSON.stringify(noteToDelete)
    });
}

