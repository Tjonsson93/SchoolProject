function deleteFunction() {
    let deleteButtons = $(".deleteButton");
    deleteButtons.empty();

    for (let i = 0; i < deleteButtons.length; i++) {
        $(deleteButtons[i]).click(function () {
            let parentElement = this.parentElement;
            parentElement.style.display = "none";
            deleteNote(note[i]);
            // note.splice(i,1); -- array
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