let notes = [];
let titlelist = [];


//adding a new note to the list.
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
    renderTitles();
}
// function to display the list of notes on the page.
function renderList() {
    let list = $("#notesList");
    list.empty();
    for (everyNote of notes) {
        let date = new Date(everyNote.timestamp).toLocaleString();
        
        list.append(`<li id="noteId"> <h3>${everyNote.title}</h3> <br>
        published: ${date} <br> 
        <p>${everyNote.text}</p>
        <button class="deleteButton">Delete</button></li>`);

        
    }
    deleteFunction();
}

function renderTitles() {
    let list = $("#titleList");
    list.empty();
    for (everyNote of notes) {
        
        
        list.append(`<li id="titleLink"><a href="">${everyNote.title}</a></li>`);
        
        
        
    }
    
}


$(function(){

    $('input[type="text"]').keyup(function(){
        
        var searchText = $(this).val();
        
        $('ul > li').each(function(){
            
            var currentLiText = $(this).text(),
                showCurrentLi = currentLiText.indexOf(searchText) !== -1;
            
            $(this).toggle(showCurrentLi);
            
        });     
    });

});






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
    renderTitles();
}

async function deleteNote(note) {
    let result = await fetch("/rest/notes/id", {
        method: "DELETE",
        body: JSON.stringify(note)
    });
}


getNotes();
